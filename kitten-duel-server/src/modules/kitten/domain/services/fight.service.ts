import { Kitten } from '../entities/kitten.entity';
import { SkillRegistry } from '../skills/skill.registry';
import { RandomService } from './random.service';
import { BuffService } from './buff.service';
import { FightStep } from '../entities/fight-step.entity';
import {
  ActionDetails,
  ActionOutcome,
  ActionType,
  AttackDetails,
} from '../entities/action-details.entity';

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
    const actionDetails: ActionDetails = {};

    return new FightStep(
      attacker,
      defender,
      ActionOutcome.Missed,
      ActionType.Attack,
      actionDetails,
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
      const baseAttackPower = attacker.stats.getAttackPower();
      const criticalModifier = isCritical ? 1.5 : 1;
      const totalAttackPower = baseAttackPower * criticalModifier;
      const damage = Math.max(
        0,
        totalAttackPower - defender.stats.getDefensePower(),
      );

      defender.healthSystem.dealDamage(damage);

      const outcome = isCritical
        ? ActionOutcome.CriticalHit
        : ActionOutcome.Success;
      const actionDetails: AttackDetails = {
        damageDealt: damage,
        criticalHit: isCritical,
        criticalMultiplier: criticalModifier,
      };

      return new FightStep(
        attacker,
        defender,
        outcome,
        ActionType.Attack,
        actionDetails,
        isCritical ? 'Coup critique!' : 'Attaque réussie!',
      );
    } else if (dodgeChance <= defender.stats.getDodgeChance()) {
      const actionDetails: AttackDetails = {
        damageDealt: 0,
        criticalHit: false,
        criticalMultiplier: 1,
      };

      return new FightStep(
        attacker,
        defender,
        ActionOutcome.Evaded,
        ActionType.Attack,
        actionDetails,
        'Esquive réussie!',
      );
    } else {
      const actionDetails: AttackDetails = {
        damageDealt: 0,
        criticalHit: false,
        criticalMultiplier: 1,
      };

      return new FightStep(
        attacker,
        defender,
        ActionOutcome.Missed,
        ActionType.Attack,
        actionDetails,
        'Attaque manquée!',
      );
    }
  }
}
