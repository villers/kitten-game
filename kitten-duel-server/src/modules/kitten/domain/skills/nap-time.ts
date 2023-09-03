import { Skill, SkillArgs } from './skill.interface';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight-step.entity';
import {
  ActionOutcome,
  ActionType,
  SpellDetails,
} from '../entities/action-details.entity';

export class NapTime implements Skill {
  static activationChance = 20;

  constructor(private randomService: RandomService) {}

  isActive({ attacker }: SkillArgs): boolean {
    return (
      attacker.healthSystem.hp < attacker.healthSystem.maxHp * 0.9 &&
      this.randomService.numberBelow(100) <= NapTime.activationChance
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const healAmount = attacker.healthSystem.maxHp * 0.1;
    attacker.healthSystem.heal(healAmount);

    const actionDetails: SpellDetails = {
      buffsApplied: [],
      damageDealt: 0,
      debuffsApplied: [],
      healAmount,
      spellName: 'Nap Time',
    };

    return new FightStep(
      attacker,
      defender,
      ActionOutcome.Success,
      ActionType.Heal,
      actionDetails,
      'Temps de Sieste! Récupération de la santé.',
    );
  }
}
