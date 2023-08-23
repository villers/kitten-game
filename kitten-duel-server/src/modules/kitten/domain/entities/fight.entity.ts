import { Kitten } from './kitten.entity';

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
  kitten1: Kitten;
  kitten2: Kitten;
  winner: Kitten;
  looser: Kitten;
  steps: FightStep[] = [];

  constructor(partial?: Partial<FightEntity>) {
    Object.assign(this, partial);
  }

  setOutcome(attacker: Kitten, defender: Kitten): void {
    this.winner = attacker.isAlive() ? attacker : defender;
    this.looser = attacker.isAlive() ? defender : attacker;
  }

  addStep(
    attacker: Kitten,
    defender: Kitten,
    action: string,
    damageDealt: number,
    description: string,
  ): void {
    this.steps.push(
      new FightStep(attacker, defender, action, damageDealt, description),
    );
  }
}
