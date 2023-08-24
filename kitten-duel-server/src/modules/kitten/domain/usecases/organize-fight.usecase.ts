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

const BASE_XP = 100;
const LEVEL_UP_ATTRIBUTE_POINTS = 5;

export type OrganizeFightInput = {
  kittenAId: string;
  kittenBId: string;
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
    const [originalKittenA, originalKittenB] = await Promise.all([
      this.kittenRepository.findById(inputs.kittenAId),
      this.kittenRepository.findById(inputs.kittenBId),
    ]);

    const [attacker, defender] =
      originalKittenA.agility > originalKittenB.agility
        ? [new Kitten(originalKittenA), new Kitten(originalKittenB)]
        : [new Kitten(originalKittenB), new Kitten(originalKittenA)];

    const duel = new FightEntity({ kitten1: attacker, kitten2: defender });
    while (attacker.isAlive() && defender.isAlive()) {
      const roundDetails = await this.performOneRound(attacker, defender);
      for (const roundDetail of roundDetails) {
        duel.addStep(
          roundDetail.attacker,
          roundDetail.defender,
          roundDetail.action,
          roundDetail.damageDealt,
          roundDetail.description,
        );
      }

      // Update buffs at the end of the full round
      attacker.updateBuffs();
      defender.updateBuffs();
    }

    duel.setOutcome(attacker, defender);

    const xpGained = this.calculateXpGained(
      duel.winner.level,
      duel.looser.level,
    );

    if (duel.winner.id === originalKittenA.id) {
      originalKittenA.victories += 1;
      originalKittenA.xp += xpGained;
      originalKittenB.defeats += 1;
      this.checkForLevelUpAndAssignPoints(originalKittenA);
    }
    if (duel.winner.id === originalKittenB.id) {
      originalKittenB.victories += 1;
      originalKittenB.xp += xpGained;
      originalKittenA.defeats += 1;
      this.checkForLevelUpAndAssignPoints(originalKittenB);
    }

    console.log(duel.steps.length);

    await Promise.all([
      this.fightRepository.save(duel),
      this.kittenRepository.save(originalKittenA),
      this.kittenRepository.save(originalKittenB),
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

  private checkForLevelUpAndAssignPoints(kitten: Kitten): void {
    const xpRequiredForNextLevel = kitten.level ** 2 * BASE_XP;
    while (kitten.xp >= xpRequiredForNextLevel) {
      kitten.level++;
      kitten.xp -= xpRequiredForNextLevel;
      kitten.availableAttributePoints += LEVEL_UP_ATTRIBUTE_POINTS;
    }
  }

  private calculateXpGained(winnerLevel: number, loserLevel: number): number {
    return BASE_XP * this.getXpMultiplier(winnerLevel, loserLevel);
  }

  private getXpMultiplier(winnerLevel: number, loserLevel: number): number {
    const levelDifference = loserLevel - winnerLevel;

    if (levelDifference >= 5) return 1.5;
    if (levelDifference >= 3) return 1.3;
    if (levelDifference >= 1) return 1.1;
    if (levelDifference === 0) return 1.0;
    if (levelDifference <= -1) return 0.9;
    if (levelDifference <= -3) return 0.7;

    return 0.5;
  }
}
