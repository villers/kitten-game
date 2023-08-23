import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';

export class NapTime {
  static activationChance = 20; // 20% de chance d'activation après avoir reçu une attaque
  static healAmount = 10; // Soigne de 10 HP

  static isActive(): boolean {
    return Math.random() * 100 < this.activationChance;
  }

  static execute(defender: Kitten): FightStep {
    defender.hp += this.healAmount;
    return new FightStep(
      defender,
      null,
      'naptime',
      this.healAmount,
      'Temps de Sieste! Récupération de la santé.',
    );
  }
}
