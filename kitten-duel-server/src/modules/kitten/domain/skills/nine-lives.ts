import { Skill } from './skill.interface';
import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';

export class NineLives implements Skill {
  isActive(attacker: Kitten): boolean {
    return (
      attacker.hp <= attacker.maxHp * 0.1 && !attacker.hasBuff('NineLives')
    );
  }

  execute(attacker: Kitten): FightStep {
    attacker.hp = attacker.maxHp * 0.5;
    attacker.applyBuff('NineLives', 1); // Ensure this skill can't be used again in the same fight
    return new FightStep(
      attacker,
      null,
      'nineLives',
      0,
      'Neuf vies! Récupération à 50% de la santé.',
    );
  }
}
