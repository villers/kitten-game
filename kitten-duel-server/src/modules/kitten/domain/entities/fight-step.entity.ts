import {
  ActionOutcome,
  ActionType,
  ActionDetails,
} from './action-details.entity';
import { Kitten } from './kitten.entity';

export class FightStep {
  attacker: Kitten;
  defender: Kitten;
  outcome: ActionOutcome;
  actionType: ActionType;
  actionDetails: ActionDetails;
  description: string;

  constructor(
    attacker: Kitten,
    defender: Kitten,
    outcome: ActionOutcome,
    actionType: ActionType,
    actionDetails: ActionDetails,
    description: string,
  ) {
    this.attacker = attacker;
    this.defender = defender;
    this.outcome = outcome;
    this.actionType = actionType;
    this.actionDetails = actionDetails;
    this.description = description;
  }

  toJSON(): any {
    return {
      attacker: this.attacker,
      defender: this.defender,
      outcome: this.outcome,
      actionType: this.actionType,
      actionDetails: this.actionDetails,
      description: this.description,
    };
  }
}
