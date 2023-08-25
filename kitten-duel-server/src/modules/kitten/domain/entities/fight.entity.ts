import { Kitten } from './kitten.entity';
import { BASE_XP } from './leveling-system.entity';

export class FightStep {
  action: string; // Stockera l'action effectuée, par exemple, 'attaque', 'esquive', 'coup critique', etc.
  attacker: Kitten;
  defender: Kitten;
  damageDealt: number;
  description: string; // Texte descriptif pour l'action

  constructor(
    attacker: Kitten,
    defender: Kitten,
    action: string,
    damageDealt: number,
    description: string,
  ) {
    this.attacker = attacker;
    this.defender = defender;
    this.action = action;
    this.damageDealt = damageDealt;
    this.description = description;
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
}
