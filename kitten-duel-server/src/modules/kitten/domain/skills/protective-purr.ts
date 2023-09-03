import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { Buff } from '../entities/buff.entity';
import { FightStep } from '../entities/fight-step.entity';
import {
  ActionOutcome,
  ActionType,
  SpellDetails,
} from '../entities/action-details.entity';

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
      type: 'increaseDefense',
      value: 0.3 * attacker.stats.getDefensePower(),
    });

    this.buffService.applyBuff(attacker, buff);

    const actionDetails: SpellDetails = {
      spellName: 'Protective Purr',
      damageDealt: 0,
      healAmount: 0,
      buffsApplied: [buff],
      debuffsApplied: [],
    };

    return new FightStep(
      attacker,
      defender,
      ActionOutcome.Success,
      ActionType.Spell,
      actionDetails,
      'Ronronnement protecteur! La défense est renforcée pendant 3 tours.',
    );
  }
}
