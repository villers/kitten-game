import { Skill, SkillArgs } from './skill.interface';
import { FightStep } from '../entities/fight.entity';
import { RandomService } from '../services/random.service';

export class NapTime implements Skill {
  static activationChance = 20;
  constructor(private randomService: RandomService) {}

  isActive({ attacker }: SkillArgs): boolean {
    return (
      attacker.healthSystem.hp < attacker.healthSystem.maxHp * 0.9 &&
      this.randomService.numberBelow(100) <= NapTime.activationChance
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const healAmount = attacker.healthSystem.maxHp * 0.1;
    attacker.healthSystem.heal(healAmount);
    return new FightStep(
      attacker,
      defender,
      'naptime',
      0,
      healAmount,
      'Temps de Sieste! Récupération de la santé.',
    );
  }
}
