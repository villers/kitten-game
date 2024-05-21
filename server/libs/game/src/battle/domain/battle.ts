import { Combatant } from './combatant';
import { BattleWithSameKittenError } from './errors';
import {
  DefaultRandomGenerator,
  RandomGenerator,
} from '@game/game/utils/random/random-generator';
import { BattleSteps } from '@game/game/battle/domain/battle-step';

export class Battle {
  private _steps: BattleSteps[] = [];
  private _winner: Combatant | null = null;

  constructor(
    private _id: number,
    private _combatants: Combatant[],
    private randomGenerator: RandomGenerator = new DefaultRandomGenerator(),
  ) {
    if (_combatants[0].kitten.id === _combatants[1].kitten.id) {
      throw new BattleWithSameKittenError('Kittens must be different');
    }
  }

  get id() {
    return this._id;
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

  setSteps(steps: BattleSteps[]) {
    this._steps = steps;
  }

  setWinner(winner: Combatant) {
    this._winner = winner;
  }

  simulate() {
    this.initializeBattle();

    while (this.winner === null) {
      this.orderCombatants();
      this.playCombatantTurn();
      this.checkForWinner();
    }

    this.finalizeBattle();
  }

  private initializeBattle() {
    this._combatants.forEach((combatant) => {
      this._steps.push({
        action: 'arrive',
        combatant: combatant.kitten.name,
      });
    });
  }

  private checkForWinner() {
    const aliveCombatants = this._combatants.filter((c) => c.kitten.hp > 0);

    if (aliveCombatants.length === 1) {
      this._winner = aliveCombatants[0];
      this._steps.push({
        action: 'end',
        winner: this._winner.kitten.name,
        loser: this._combatants.find((c) => c !== this._winner).kitten.name,
      });
    } else if (aliveCombatants.length === 0) {
      this._steps.push({
        action: 'end',
        winner: 'None',
        loser: 'None',
      });
      this._winner = null;
    }
  }

  private finalizeBattle() {
    const loser = this._combatants.find((c) => c !== this._winner);
    this._steps.push({
      action: 'end',
      winner: this._winner ? this._winner.kitten.name : 'None',
      loser: loser ? loser.kitten.name : 'None',
    });
  }

  private orderCombatants() {
    this._combatants.sort((a, b) => b.kitten.initiative - a.kitten.initiative);
  }

  private playCombatantTurn() {
    const attacker = this._combatants[0];
    const defender = this._combatants[1];

    if (attacker.kitten.hp > 0) {
      const damage = this.randomGenerator.between(
        1,
        attacker.kitten.strength.finalValue,
      );
      defender.kitten.hp -= damage;

      this._steps.push({
        action: 'attack',
        attacker: attacker.kitten.name,
        target: defender.kitten.name,
        damage,
      });

      if (defender.kitten.hp <= 0) {
        this._steps.push({
          action: 'death',
          combatant: defender.kitten.name,
        });
      }
    }

    this._combatants.push(this._combatants.shift());
  }
}
