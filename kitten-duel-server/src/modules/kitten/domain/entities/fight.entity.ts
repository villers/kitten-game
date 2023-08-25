import { Kitten } from './kitten.entity';
import { BASE_XP } from './leveling-system.entity'; //

export type StepAction =
  | 'distract'
  | 'esquive'
  | 'raté'
  | 'furySwipe'
  | 'hairball'
  | 'mysticalMeow'
  | 'naptime'
  | 'nineLives'
  | 'pounce'
  | 'protectivePurr'
  | 'sharpClaws'
  | 'purrHealing'
  | 'attaque'
  | 'coup critique';

export class FightStep {
  action: StepAction;
  attacker: Kitten;
  defender: Kitten;
  damageDealt: number;
  healAmount?: number;
  description: string;

  constructor(
    attacker: Kitten,
    defender: Kitten,
    action: StepAction,
    damageDealt: number,
    healAmount: number,
    description: string,
  ) {
    this.attacker = attacker.clone();
    this.defender = defender.clone();
    this.action = action;
    this.damageDealt = damageDealt;
    this.healAmount = healAmount;
    this.description = description;
  }

  clone(): FightStep {
    return new FightStep(
      this.attacker,
      this.defender,
      this.action,
      this.damageDealt,
      this.healAmount,
      this.description,
    );
  }
}

export class FightEntity {
  id: string;
  attacker: Kitten;
  defender: Kitten;
  winner: Kitten;
  looser: Kitten;
  xpGained: number;
  steps: FightStep[] = [];

  constructor(partial?: Partial<FightEntity>) {
    Object.assign(this, partial);
  }
  addSteps(steps: FightStep[]): void {
    this.steps = this.steps.concat(steps);
  }

  setOutcome(attacker: Kitten, defender: Kitten): void {
    this.winner = attacker.healthSystem.isAlive() ? attacker : defender;
    this.looser = attacker.healthSystem.isAlive() ? defender : attacker;

    this.xpGained = this.calculateXpGained(
      this.winner.levelingSystem.level,
      this.looser.levelingSystem.level,
    );
  }

  private calculateXpGained(winnerLevel: number, loserLevel: number): number {
    return BASE_XP * this.getXpMultiplier(winnerLevel, loserLevel);
  }

  private getXpMultiplier(winnerLevel: number, loserLevel: number): number {
    const levelDifference = loserLevel - winnerLevel;

    if (levelDifference >= 5) return 1.5;
    if (levelDifference >= 3) return 1.3;
    if (levelDifference >= 1) return 1.1;
    if (levelDifference === 0) return 1.0;
    if (levelDifference <= -1) return 0.9;
    if (levelDifference <= -3) return 0.7;

    return 0.5;
  }

  clone(): FightEntity {
    return new FightEntity({
      id: this.id,
      attacker: this.attacker.clone(),
      defender: this.defender.clone(),
      winner: this.winner.clone(),
      looser: this.looser.clone(),
      xpGained: this.xpGained,
      steps: this.steps.map((step) => step.clone()),
    });
  }
}
