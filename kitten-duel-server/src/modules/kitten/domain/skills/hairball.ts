import { Skill, SkillArgs } from './skill.interface';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight-step.entity';
import {
  ActionOutcome,
  ActionType,
  AttackDetails,
} from '../entities/action-details.entity';

export class Hairball implements Skill {
  static activationChance = 10;

  constructor(private randomService: RandomService) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) <= Hairball.activationChance;
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const isCritical = Math.random() <= attacker.stats.getCriticalChance();
    const baseAttackPower = attacker.stats.getAttackPower() * 0.5;
    const criticalModifier = isCritical ? 1.5 : 1;
    const damage = baseAttackPower * criticalModifier;
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
      ActionType.Spell,
      actionDetails,
      'Boule de poils lancée! Petite attaque surprise.',
    );
  }
}
