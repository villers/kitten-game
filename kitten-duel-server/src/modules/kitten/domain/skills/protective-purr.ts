import { FightStep } from '../entities/fight.entity';
import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { Buff } from '../entities/buff.entity';

export class ProtectivePurr implements Skill {
  static activationChance = 20;

  constructor(
    private buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({}: SkillArgs): boolean {
    return (
      this.randomService.numberBelow(100) <= ProtectivePurr.activationChance
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const buff = new Buff('Protection', 3, {
      type: 'reduceDefense',
      value: -0.3 * defender.stats.getDefensePower(),
    });

    this.buffService.applyBuff(attacker, buff);
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
