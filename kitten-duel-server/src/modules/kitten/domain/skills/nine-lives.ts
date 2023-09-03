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

    const buff = new Buff('NineLives', 1, null);
    this.buffService.applyBuff(attacker, buff);

    const actionDetails: SpellDetails = {
      buffsApplied: [buff],
      damageDealt: 0,
      debuffsApplied: [],
      healAmount: healing,
      spellName: 'Nine Lives',
    };

    return new FightStep(
      attacker,
      defender,
      ActionOutcome.Success,
      ActionType.Heal,
      actionDetails,
      'Neuf vies! Récupération à 50% de la santé.',
    );
  }
}
