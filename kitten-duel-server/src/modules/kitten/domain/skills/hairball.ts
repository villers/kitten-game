import { Skill } from './skill.interface';
import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';

export class Hairball implements Skill {
  static activationChance = 15;

  isActive(attacker: Kitten, defender: Kitten): boolean {
    return Math.random() * 100 < Hairball.activationChance;
  }

  execute(attacker: Kitten, defender: Kitten): FightStep {
    const damage = attacker.strength * 0.5; // For example, hairball damage could be half of strength
    defender.hp -= damage;
    return new FightStep(
      attacker,
      defender,
      'hairball',
      damage,
      'Boule de poils lancée! Petite attaque surprise.',
    );
  }
}

export class PurrHealing implements Skill {
  static activationChance = 20;

  isActive(attacker: Kitten): boolean {
    return (
      Math.random() * 100 < PurrHealing.activationChance &&
      attacker.hp <= attacker.maxHp * 0.5
    );
  }

  execute(attacker: Kitten): FightStep {
    const healing = attacker.vitality * 1.5; // For example, healing could be 1.5 times vitality
    attacker.hp += healing;
    return new FightStep(
      attacker,
      null,
      'purrHealing',
      healing,
      'Ronronnement thérapeutique! Récupération de la santé.',
    );
  }
}

export class Distract implements Skill {
  activationChance = 10;

  isActive(attacker: Kitten, defender: Kitten): boolean {
    // Only activate if defender doesn't have the Distracted buff already
    return (
      !defender.hasBuff('Distracted') &&
      Math.random() * 100 < this.activationChance
    );
  }

  execute(attacker: Kitten, defender: Kitten): FightStep {
    defender.applyBuff('Distracted', 1); // Defender might lose their next turn
    return new FightStep(
      attacker,
      defender,
      'distract',
      0,
      'Distraction! Le défenseur pourrait perdre son prochain tour.',
    );
  }
}
