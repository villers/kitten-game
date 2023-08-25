import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight.entity';

export class Distract implements Skill {
  activationChance = 10;

  constructor(
    private readonly buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({ defender }: SkillArgs): boolean {
    // Only activate if defender doesn't have the Distracted buff already
    return (
      !this.buffService
        .getBuffsForKitten(defender)
        .some((buff) => buff.name === 'Distracted') &&
      this.randomService.numberBelow(100) < this.activationChance
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    this.buffService.applyBuff(defender, {
      name: 'Distracted',
      duration: 1,
      effect: null,
    });
    return new FightStep(
      attacker,
      defender,
      'distract',
      0,
      'Distraction! Le défenseur pourrait perdre son prochain tour.',
    );
  }
}
