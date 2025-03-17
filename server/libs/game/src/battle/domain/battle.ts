import { BattleWithSameKittenError } from './errors';
import {
  DefaultRandomGenerator,
  RandomGenerator,
} from '@game/game/utils/random/random-generator';
import { BattleSteps } from '@game/game/battle/domain/battle-step';
import { Kitten } from '@game/game/kitten/domain/kitten';

export class Battle {
  private _steps: BattleSteps[] = [];
  private _winner: Kitten | null = null;
  private _looser: Kitten | null = null;

  constructor(
    private _id: number,
    private _combatants: Kitten[],
    private randomGenerator: RandomGenerator = new DefaultRandomGenerator(),
  ) {
    if (_combatants[0].id === _combatants[1].id) {
      throw new BattleWithSameKittenError('Kittens must be different');
    }
  }

  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get combatants() {
    return this._combatants;
  }

  get steps() {
    return this._steps;
  }

  get winner() {
    return this._winner;
  }

  get looser() {
    return this._looser;
  }

  set steps(steps: BattleSteps[]) {
    this._steps = steps;
  }

  set winner(winner: Kitten) {
    this._winner = winner;
  }

  set looser(looser: Kitten) {
    this._looser = looser;
  }

  simulate() {
    this.initializeBattle();

    while (this.winner === null) {
      this.orderCombatants();
      this.playCombatantTurn();
      this.checkForWinner();
    }
  }

  private initializeBattle() {
    this.combatants.forEach((combatant) => {
      this.steps.push({
        action: 'arrive',
        combatant: combatant.name,
      });
    });
  }

  private orderCombatants() {
    this.combatants.sort((a, b) => {
      if (a.hp <= 0) return 1;
      if (b.hp <= 0) return -1;
      // Random order if initiative is the same
      if (a.initiative === b.initiative) {
        return this.randomGenerator.random() > 0.5 ? 1 : -1;
      }
      // Lower initiative first
      return a.initiative - b.initiative;
    });
  }

  private rotateCombatants() {
    this.combatants.push(this.combatants.shift());
  }

  private playCombatantTurn() {
    const attacker = this.combatants[0];
    const defender = this.combatants[1];

    if (attacker.isAlive()) {
      const damage = attacker.attack(defender);
      this.steps.push({
        action: 'attack',
        attacker: attacker.name,
        target: defender.name,
        damage,
      });

      if (defender.attributes.isDead()) {
        this.steps.push({
          action: 'death',
          combatant: defender.name,
        });
      }
    }

    attacker.increaseInitiative();

    this.rotateCombatants();
  }

  private checkForWinner() {
    const aliveCombatants = this.combatants.filter((kitten) =>
      kitten.isAlive(),
    );

    if (aliveCombatants.length > 1) {
      return;
    }

    this.winner = aliveCombatants[0];
    this.looser = this.combatants.find((kitten) => kitten.attributes.isDead());
    this.steps.push({
      action: 'end',
      winner: this.winner.name,
      loser: this.looser.name,
    });
  }
}
