import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight-step.entity';
import {
  ActionOutcome,
  ActionType,
  AttackDetails,
} from '../entities/action-details.entity';

export class Pounce implements Skill {
  static activationChance = 15;

  constructor(
    private buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({ attacker }: SkillArgs): boolean {
    return (
      this.randomService.numberBelow(100) <= Pounce.activationChance &&
      !this.buffService
        .getBuffsForKitten(attacker)
        .some((buff) => buff.name === 'GriffesAcerées')
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const isCritical = Math.random() <= attacker.stats.getCriticalChance();
    const baseAttackPower = 0.8 * attacker.stats.getAttackPower();
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
      'Attaque Surprise réussie!',
    );
  }
}
