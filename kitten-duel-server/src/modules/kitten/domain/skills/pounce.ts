import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';
import { Skill } from './skill.interface';

export class Pounce implements Skill {
  static activationChance = 10;

  isActive(attacker: Kitten, defender: Kitten): boolean {
    return (
      Math.random() * 100 < Pounce.activationChance &&
      !attacker.hasBuff('GriffesAcerées')
    );
  }

  execute(attacker: Kitten, defender: Kitten): FightStep {
    const damage = attacker.getAttackPower();
    defender.hp -= damage;
    return new FightStep(
      attacker,
      defender,
      'pounce',
      damage,
      'Attaque Surprise réussie!',
    );
  }
}
