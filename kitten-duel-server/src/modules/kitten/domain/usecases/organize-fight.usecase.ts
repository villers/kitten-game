import { EquipmentRepository } from '../repositories/equipment.repository';
import { FightRepository } from '../repositories/fight.repository';
import { KittenRepository } from '../repositories/kitten.repository';
import { FightEntity, FightStep } from '../entities/fight.entity';
import { Kitten } from '../entities/kitten.entity';
import { Pounce } from '../skills/pounce';
import { Skill } from '../skills/skill.interface';
import { NapTime } from '../skills/nap-time';
import { NineLives } from '../skills/nine-lives';
import { SharpClaws } from '../skills/sharp-claws';
import { Distract, Hairball, PurrHealing } from '../skills/hairball';

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
      const roundDetails = await this.performOneRound(attacker, defender);
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

  private async performOneRound(
    firstAttacker: Kitten,
    secondAttacker: Kitten,
  ): Promise<FightStep[]> {
    let steps: FightStep[] = [];

    // First kitten attacks second kitten
    steps = steps.concat(
      await this.performAttackWithSkills(firstAttacker, secondAttacker),
    );

    // Second kitten attacks first kitten
    steps = steps.concat(
      await this.performAttackWithSkills(secondAttacker, firstAttacker),
    );

    return steps;
  }

  private async performAttackWithSkills(
    attacker: Kitten,
    defender: Kitten,
  ): Promise<FightStep[]> {
    const steps: FightStep[] = [];

    // Check if the attacker is distracted
    if (attacker.hasBuff('Distracted')) {
      steps.push(
        new FightStep(
          attacker,
          defender,
          'distract',
          0,
          'Le chaton est distrait et saute son tour!',
        ),
      );
      return steps;
    }

    // Get a list of all skills available
    const availableSkills: Skill[] = [
      new Pounce(),
      new NapTime(),
      new NineLives(),
      new SharpClaws(),
      new Hairball(),
      new PurrHealing(),
      new Distract(),
    ];

    // Check if any of the skills are active and execute them
    for (const skill of availableSkills) {
      if (skill.isActive(attacker, defender)) {
        steps.push(skill.execute(attacker, defender));
      }
    }

    // If no skills were activated, perform a regular attack
    if (steps.length === 0) {
      steps.push(await this.performAttack(attacker, defender));
    }

    return steps;
  }

  private async performAttack(
    attacker: Kitten,
    defender: Kitten,
  ): Promise<FightStep> {
    const hitChance = Math.random() * 100;
    const dodgeChance = Math.random() * 100;
    const criticalChance = Math.random() * 100;

    if (
      hitChance <= attacker.getHitChance() &&
      dodgeChance > defender.getDodgeChance()
    ) {
      const isCritical = criticalChance <= attacker.getCriticalChance();
      const damage = isCritical
        ? attacker.getAttackPower() * 1.5
        : attacker.getAttackPower();
      defender.hp -= damage;
      return new FightStep(
        attacker,
        defender,
        isCritical ? 'coup critique' : 'attaque',
        damage,
        isCritical ? 'Coup critique!' : 'Attaque réussie!',
      );
    } else if (dodgeChance <= defender.getDodgeChance()) {
      return new FightStep(
        attacker,
        defender,
        'esquive',
        0,
        'Esquive réussie!',
      );
    } else {
      return new FightStep(attacker, defender, 'raté', 0, 'Attaque manquée!');
    }
  }
}
