import { FightStep } from '../entities/fight.entity';
import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';

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
    const damage = isCritical
      ? 1.5 * 0.8 * attacker.stats.getAttackPower()
      : 0.8 * attacker.stats.getAttackPower();
    defender.healthSystem.dealDamage(damage);
    return new FightStep(
      attacker,
      defender,
      'pounce',
      damage,
      0,
      'Attaque Surprise réussie!',
    );
  }
}
