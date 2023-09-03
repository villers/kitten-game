import { Buff } from './buff.entity';

export enum ActionOutcome {
  Success,
  Missed,
  Evaded,
  CriticalHit,
}

export enum ActionType {
  Attack,
  Spell,
  Heal,
}

export interface ActionDetails {}

export interface AttackDetails extends ActionDetails {
  damageDealt: number;
  criticalHit: boolean;
  criticalMultiplier: number;
}

export interface SpellDetails extends ActionDetails {
  spellName: string;
  damageDealt: number;
  healAmount: number;
  buffsApplied: Buff[];
  debuffsApplied: Buff[];
}
