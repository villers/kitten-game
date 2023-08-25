import { Skill, SkillArgs } from './skill.interface';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight.entity';

export class PureHealing implements Skill {
  static activationChance = 20;

  constructor(private randomService: RandomService) {}

  isActive({ attacker }: SkillArgs): boolean {
    return (
      this.randomService.numberBelow(100) < PureHealing.activationChance &&
      attacker.healthSystem.hp <= attacker.healthSystem.maxHp * 0.5
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const healing = attacker.stats.vitality * 1.5;
    attacker.healthSystem.heal(healing);
    return new FightStep(
      attacker,
      defender,
      'purrHealing',
      healing,
      'Ronronnement thérapeutique! Récupération de la santé.',
    );
  }
}
