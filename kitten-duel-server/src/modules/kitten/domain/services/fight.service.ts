import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';
import { SkillRegistry } from '../skills/skill.registry';
import { RandomService } from './random.service';
import { BuffService } from './buff.service';

export class FightService {
  constructor(
    private skillRegistry: SkillRegistry,
    private randomService: RandomService,
    private buffService: BuffService,
  ) {}

  performOneRound(attacker: Kitten, defender: Kitten): FightStep[] {
    let steps: FightStep[] = [];

    // First kitten attacks second kitten
    steps = steps.concat(this.performAttackWithSkills(attacker, defender));

    // Second kitten attacks first kitten
    steps = steps.concat(this.performAttackWithSkills(defender, attacker));

    return steps;
  }

  performAttackWithSkills(attacker: Kitten, defender: Kitten): FightStep[] {
    const steps: FightStep[] = [];

    if (this.isKittenDistracted(attacker)) {
      steps.push(this.handleDistractedKitten(attacker, defender));
      return steps;
    }

    this.handleSkills(attacker, defender, steps);

    // If no skills were activated, perform a regular attack
    if (steps.length === 0) {
      steps.push(this.performAttack(attacker, defender));
    }

    return steps;
  }

  private isKittenDistracted(kitten: Kitten): boolean {
    return this.buffService
      .getBuffsForKitten(kitten)
      .some((buff) => buff.name === 'Distracted');
  }

  private handleDistractedKitten(
    attacker: Kitten,
    defender: Kitten,
  ): FightStep {
    return new FightStep(
      attacker,
      defender,
      'distract',
      0,
      'Le chaton est distrait et saute son tour!',
    );
  }

  private handleSkills(
    attacker: Kitten,
    defender: Kitten,
    steps: FightStep[],
  ): void {
    const availableSkills = this.skillRegistry.getAll();
    for (const skill of availableSkills) {
      if (skill.isActive({ attacker, defender })) {
        steps.push(skill.execute({ attacker, defender }));
      }
    }
  }

  performAttack(attacker: Kitten, defender: Kitten): FightStep {
    const hitChance = this.randomService.numberBelow(100);
    const dodgeChance = this.randomService.numberBelow(100);
    const criticalChance = this.randomService.numberBelow(100);

    if (
      hitChance <= attacker.stats.getHitChance() &&
      dodgeChance > defender.stats.getDodgeChance()
    ) {
      const isCritical = criticalChance <= attacker.stats.getCriticalChance();
      const damage = isCritical
        ? attacker.stats.getAttackPower() * 1.5
        : attacker.stats.getAttackPower();
      defender.healthSystem.dealDamage(damage);
      return new FightStep(
        attacker,
        defender,
        isCritical ? 'coup critique' : 'attaque',
        damage,
        isCritical ? 'Coup critique!' : 'Attaque réussie!',
      );
    } else if (dodgeChance <= defender.stats.getDodgeChance()) {
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
