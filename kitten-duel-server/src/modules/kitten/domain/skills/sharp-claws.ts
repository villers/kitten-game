import { FightStep } from '../entities/fight.entity';
import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { Buff } from '../entities/buff.entity';

export class SharpClaws implements Skill {
  static activationChance = 10;

  constructor(
    private buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) <= SharpClaws.activationChance;
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const buff = new Buff('GriffesAcerées', 3, {
      type: 'increaseAttack',
      value: 0.5 * attacker.stats.getAttackPower(),
    });

    this.buffService.applyBuff(attacker, buff);
    return new FightStep(
      attacker,
      defender,
      'sharpClaws',
      0,
      0,
      'Griffes acérées! Augmentation des dégâts pendant 3 tours.',
    );
  }
}
