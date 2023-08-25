import { FightStep } from '../entities/fight.entity';
import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';

export class SharpClaws implements Skill {
  static activationChance = 15;

  constructor(
    private buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) < SharpClaws.activationChance;
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    this.buffService.applyBuff(attacker, {
      name: 'GriffesAcerées',
      duration: 3,
      effect: null,
    });
    return new FightStep(
      attacker,
      defender,
      'sharpClaws',
      0,
      'Griffes acérées! Augmentation des dégâts pendant 3 tours.',
    );
  }
}
