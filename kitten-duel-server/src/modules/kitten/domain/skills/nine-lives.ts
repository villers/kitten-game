import { Skill, SkillArgs } from './skill.interface';
import { FightStep } from '../entities/fight.entity';
import { BuffService } from '../services/buff.service';

export class NineLives implements Skill {
  constructor(private buffService: BuffService) {}

  isActive({ attacker }: SkillArgs): boolean {
    return (
      attacker.hp <= attacker.maxHp * 0.1 &&
      !this.buffService
        .getBuffsForKitten(attacker)
        .some((buff) => buff.name === 'NineLives')
    );
  }

  execute({ attacker }: SkillArgs): FightStep {
    attacker.hp = attacker.maxHp * 0.5;
    // Ensure this skill can't be used again in the same fight
    this.buffService.applyBuff(attacker, {
      name: 'NineLives',
      duration: 1,
      effect: null,
    });
    return new FightStep(
      attacker,
      null,
      'nineLives',
      0,
      'Neuf vies! Récupération à 50% de la santé.',
    );
  }
}
