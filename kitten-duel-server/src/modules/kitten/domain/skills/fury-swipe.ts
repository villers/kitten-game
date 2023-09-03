import { Skill, SkillArgs } from './skill.interface';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight-step.entity';
import {
  ActionOutcome,
  ActionType,
  AttackDetails,
} from '../entities/action-details.entity';

export class FurySwipe implements Skill {
  static activationChance = 15;

  constructor(private randomService: RandomService) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) <= FurySwipe.activationChance;
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const isCritical = Math.random() <= attacker.stats.getCriticalChance();
    const baseAttackPower = attacker.stats.getAttackPower() * 0.7;
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
      'Attaque rapide! Dégâts infligés avec succès.',
    );
  }
}
