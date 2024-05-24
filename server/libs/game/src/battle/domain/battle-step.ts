type BattleAction = 'arrive' | 'attack' | 'death' | 'end';

export interface BattleStep {
  action: BattleAction;
}

export interface ArriveStep extends BattleStep {
  action: 'arrive';
  combatant: string;
}

export interface AttackStep extends BattleStep {
  action: 'attack';
  attacker: string;
  target: string;
  damage: number;
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

export type BattleSteps = ArriveStep | AttackStep | DeathStep | EndStep;
