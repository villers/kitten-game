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

export class Distract implements Skill {
  activationChance = 10;

  constructor(
    private readonly buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({ defender }: SkillArgs): boolean {
    return (
      !this.buffService
        .getBuffsForKitten(defender)
        .some((buff) => buff.name === 'Distracted') &&
      this.randomService.numberBelow(100) <= this.activationChance
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const debuff = new Buff('Distracted', 1, null);
    this.buffService.applyBuff(defender, debuff);
    const actionDetails: SpellDetails = {
      buffsApplied: [],
      damageDealt: 0,
      debuffsApplied: [debuff],
      healAmount: 0,
      spellName: 'Distract',
    };

    return new FightStep(
      attacker,
      defender,
      ActionOutcome.Success,
      ActionType.Spell,
      actionDetails,
      'Le chaton est distrait!',
    );
  }
}
