import { EquipmentRepository } from '../repositories/equipment.repository';
import { FightRepository } from '../repositories/fight.repository';
import { KittenRepository } from '../repositories/kitten.repository';
import { FightEntity } from '../entities/fight.entity';
import { Kitten } from '../entities/kitten.entity';
import { FightService } from '../services/fight.service';

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
  ) {}

  async execute(inputs: OrganizeFightInput): Promise<OrganizeFightOutput> {
    const [originalAttacker, originalDefender] = await Promise.all([
      this.kittenRepository.findById(inputs.attackerId),
      this.kittenRepository.findById(inputs.defenderId),
    ]);

    const [attacker, defender] =
      originalAttacker.agility > originalDefender.agility
        ? [new Kitten(originalAttacker), new Kitten(originalDefender)]
        : [new Kitten(originalDefender), new Kitten(originalAttacker)];

    const duel = new FightEntity({
      attacker: new Kitten(originalAttacker),
      defender: new Kitten(originalDefender),
    });
    while (attacker.isAlive() && defender.isAlive()) {
      const roundDetails = this.fightService.performOneRound(
        attacker,
        defender,
      );
      duel.addSteps(roundDetails);

      // Update buffs at the end of the full round
      attacker.updateBuffs();
      defender.updateBuffs();
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
