import { Skill, SkillArgs } from './skill.interface';
import { FightStep } from '../entities/fight.entity';
import { RandomService } from '../services/random.service';

export class Hairball implements Skill {
  static activationChance = 10;

  constructor(private randomService: RandomService) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) <= Hairball.activationChance;
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const isCritical = Math.random() <= attacker.stats.getCriticalChance();
    const damage = isCritical
      ? 1.5 * attacker.stats.getAttackPower() * 0.5
      : attacker.stats.getAttackPower() * 0.5;
    defender.healthSystem.dealDamage(damage);
    return new FightStep(
      attacker,
      defender,
      'hairball',
      damage,
      0,
      'Boule de poils lancée! Petite attaque surprise.',
    );
  }
}
