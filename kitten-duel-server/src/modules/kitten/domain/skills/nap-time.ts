import { Skill, SkillArgs } from './skill.interface';
import { FightStep } from '../entities/fight.entity';
import { RandomService } from '../services/random.service';

export class NapTime implements Skill {
  static activationChance = 20;
  static healAmount = 10;

  constructor(private randomService: RandomService) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) < NapTime.activationChance;
  }

  execute({ attacker }: SkillArgs): FightStep {
    attacker.heal(NapTime.healAmount);
    return new FightStep(
      attacker,
      null,
      'naptime',
      NapTime.healAmount,
      'Temps de Sieste! Récupération de la santé.',
    );
  }
}
