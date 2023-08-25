import { Skill, SkillArgs } from './skill.interface';
import { FightStep } from '../entities/fight.entity';
import { RandomService } from '../services/random.service'; // Import the RandomService

export class Hairball implements Skill {
  static activationChance = 15;

  constructor(private randomService: RandomService) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) < Hairball.activationChance;
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const damage = attacker.stats.strength * 0.5; // For example, hairball damage could be half of strength
    defender.healthSystem.dealDamage(damage);
    return new FightStep(
      attacker,
      defender,
      'hairball',
      damage,
      'Boule de poils lancée! Petite attaque surprise.',
    );
  }
}
