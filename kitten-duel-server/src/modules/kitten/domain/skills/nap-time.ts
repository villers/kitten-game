import { Skill } from './skill.interface';
import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';

export class NapTime implements Skill {
  static activationChance = 20;
  static healAmount = 10;

  isActive(attacker: Kitten): boolean {
    return Math.random() * 100 < NapTime.activationChance;
  }

  execute(attacker: Kitten): FightStep {
    attacker.hp += NapTime.healAmount;
    return new FightStep(
      attacker,
      null,
      'naptime',
      NapTime.healAmount,
      'Temps de Sieste! Récupération de la santé.',
    );
  }
}
