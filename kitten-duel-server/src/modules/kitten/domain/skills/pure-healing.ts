import { Skill, SkillArgs } from './skill.interface';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight.entity';

export class PurrHealing implements Skill {
  static activationChance = 20;

  constructor(private randomService: RandomService) {}

  isActive({ attacker }: SkillArgs): boolean {
    return (
      this.randomService.numberBelow(100) < PurrHealing.activationChance &&
      attacker.hp <= attacker.maxHp * 0.5
    );
  }

  execute({ attacker }: SkillArgs): FightStep {
    const healing = attacker.vitality * 1.5; // For example, healing could be 1.5 times vitality
    attacker.heal(healing);
    return new FightStep(
      attacker,
      null,
      'purrHealing',
      healing,
      'Ronronnement thérapeutique! Récupération de la santé.',
    );
  }
}
