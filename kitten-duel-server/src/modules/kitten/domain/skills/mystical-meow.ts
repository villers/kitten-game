import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { Buff } from '../entities/buff.entity';
import { FightStep } from '../entities/fight-step.entity';
import {
  ActionDetails,
  ActionOutcome,
  ActionType,
  SpellDetails,
} from '../entities/action-details.entity';

export class MysticalMeow implements Skill {
  static activationChance = 15;

  constructor(
    private buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) <= MysticalMeow.activationChance;
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const debuff = new Buff('Confused', 2, {
      type: 'reduceAttack',
      value: -0.5 * defender.stats.getAttackPower(),
    });

    this.buffService.applyBuff(defender, debuff);

    const actionDetails: SpellDetails = {
      buffsApplied: [],
      damageDealt: 0,
      debuffsApplied: [debuff],
      healAmount: 0,
      spellName: 'Mystical Meow',
    };

    return new FightStep(
      attacker,
      defender,
      ActionOutcome.Success,
      ActionType.Spell,
      actionDetails,
      "Miaulement mystique! L'adversaire est confus et sa chance d'attaquer est réduite.",
    );
  }
}
