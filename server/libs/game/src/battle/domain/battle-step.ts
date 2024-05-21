export interface BattleStep {
  action: string;
}

export interface AttackStep extends BattleStep {
  action: 'attack';
  attacker: string;
  target: string;
  damage: number;
}

export interface VictoryStep extends BattleStep {
  action: 'victory';
  winner: string;
}

export interface ArriveStep extends BattleStep {
  action: 'arrive';
  combatant: string;
}

export interface EvadeStep extends BattleStep {
  action: 'evade';
  combatant: string;
}

export interface BlockStep extends BattleStep {
  action: 'block';
  combatant: string;
}

export interface CounterStep extends BattleStep {
  action: 'counter';
  combatant: string;
  opponent: string;
}

export interface DeathStep extends BattleStep {
  action: 'death';
  combatant: string;
}

export interface EndStep extends BattleStep {
  action: 'end';
  winner: string;
  loser: string;
}

export type BattleSteps =
  | AttackStep
  | VictoryStep
  | ArriveStep
  | EvadeStep
  | BlockStep
  | CounterStep
  | DeathStep
  | EndStep;
