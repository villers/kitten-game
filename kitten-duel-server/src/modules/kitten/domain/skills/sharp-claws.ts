import { FightStep } from '../entities/fight.entity';
import { Kitten } from '../entities/kitten.entity';
import { Skill } from './skill.interface';

export class SharpClaws implements Skill {
  static activationChance = 15;

  isActive(attacker: Kitten): boolean {
    return Math.random() * 100 < SharpClaws.activationChance;
  }

  execute(attacker: Kitten): FightStep {
    attacker.applyBuff('GriffesAcerées', 3); // Boost for 3 turns
    return new FightStep(
      attacker,
      null,
      'sharpClaws',
      0,
      'Griffes acérées! Augmentation des dégâts pendant 3 tours.',
    );
  }
}
