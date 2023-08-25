import { FightStep } from '../entities/fight.entity';
import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';

export class ProtectivePurr implements Skill {
  static activationChance = 20;

  constructor(
    private buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({}: SkillArgs): boolean {
    return (
      this.randomService.numberBelow(100) < ProtectivePurr.activationChance
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    this.buffService.applyBuff(attacker, {
      name: 'Protection',
      duration: 3,
      effect: {
        type: 'reduceDefense',
        value: -0.3 * defender.stats.getDefensePower(),
      },
    });
    return new FightStep(
      attacker,
      defender,
      'protectivePurr',
      0,
      0,
      'Ronronnement protecteur! La défense est renforcée pendant 3 tours.',
    );
  }
}
