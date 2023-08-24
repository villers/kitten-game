import { EquipmentRepository } from '../repositories/equipment.repository';
import { FightRepository } from '../repositories/fight.repository';
import { KittenRepository } from '../repositories/kitten.repository';
import { FightEntity } from '../entities/fight.entity';
import { FightService } from '../services/fight.service';
import { BuffService } from '../services/buff.service';

export type OrganizeFightInput = {
  attackerId: string;
  defenderId: string;
};

export type OrganizeFightOutput = {
  fight: FightEntity;
};

export class OrganizeFightUsecase {
  constructor(
    private equipmentService: EquipmentRepository,
    private fightRepository: FightRepository,
    private kittenRepository: KittenRepository,
    private fightService: FightService,
    private buffService: BuffService,
  ) {}

  async execute(inputs: OrganizeFightInput): Promise<OrganizeFightOutput> {
    const [originalAttacker, originalDefender] = await Promise.all([
      this.kittenRepository.findById(inputs.attackerId),
      this.kittenRepository.findById(inputs.defenderId),
    ]);

    const [attacker, defender] =
      originalAttacker.agility > originalDefender.agility
        ? [originalAttacker.clone(), originalDefender.clone()] // Use clone method
        : [originalDefender.clone(), originalAttacker.clone()]; // Use clone method

    const duel = new FightEntity({
      attacker: originalAttacker.clone(),
      defender: originalDefender.clone(),
    });

    while (attacker.isAlive() && defender.isAlive()) {
      const roundDetails = this.fightService.performOneRound(
        attacker,
        defender,
      );
      duel.addSteps(roundDetails);

      // Update buffs at the end of the full round using BuffService
      this.buffService.updateBuffDurations();
    }

    duel.setOutcome(attacker, defender);

    if (duel.winner.id === originalAttacker.id) {
      originalAttacker.setWinner(duel.xpGained);
      originalDefender.setLoser();
    } else {
      originalDefender.setWinner(duel.xpGained);
      originalAttacker.setLoser();
    }

    await Promise.all([
      this.fightRepository.save(duel),
      this.kittenRepository.save(originalAttacker),
      this.kittenRepository.save(originalDefender),
    ]);

    return { fight: duel };
  }
}
