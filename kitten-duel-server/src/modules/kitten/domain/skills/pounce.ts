import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';

export class Pounce {
  static activationChance = 10; // 10% de chance d'activation

  static isActive(): boolean {
    return Math.random() * 100 < this.activationChance;
  }

  static execute(attacker: Kitten, defender: Kitten): FightStep {
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
