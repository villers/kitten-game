import { Skill, SkillArgs } from './skill.interface';
import { FightStep } from '../entities/fight.entity';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';

export class NineLives implements Skill {
  constructor(
    private buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({ attacker }: SkillArgs): boolean {
    return (
      this.randomService.numberBelow(100) <= 5 &&
      attacker.healthSystem.hp <= attacker.healthSystem.maxHp * 0.1 &&
      !this.buffService
        .getBuffsForKitten(attacker)
        .some((buff) => buff.name === 'NineLives')
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const healing = attacker.healthSystem.maxHp * 0.5;
    attacker.healthSystem.hp = healing;
    this.buffService.applyBuff(attacker, {
      name: 'NineLives',
      duration: 1,
      effect: null,
    });
    return new FightStep(
      attacker,
      defender,
      'nineLives',
      0,
      healing,
      'Neuf vies! Récupération à 50% de la santé.',
    );
  }
}
