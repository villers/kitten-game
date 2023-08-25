import { FightStep } from '../entities/fight.entity';
import { Skill, SkillArgs } from './skill.interface';
import { RandomService } from '../services/random.service';

export class FurySwipe implements Skill {
  static activationChance = 15;

  constructor(private randomService: RandomService) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) < FurySwipe.activationChance;
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const isCritical = Math.random() <= attacker.stats.getCriticalChance();
    const damage = isCritical
      ? 1.5 * attacker.stats.getAttackPower() * 0.7
      : attacker.stats.getAttackPower() * 0.7;
    defender.healthSystem.dealDamage(damage);
    return new FightStep(
      attacker,
      defender,
      'furySwipe',
      damage,
      0,
      'Attaque rapide! Dégâts infligés avec succès.',
    );
  }
}
