import { Kitten } from '../../kitten/domain/kitten';

export class Combatant {
  constructor(private _kitten: Kitten) {}

  get kitten() {
    return this._kitten;
  }

  static from(kitten: Kitten) {
    return new Combatant(kitten);
  }
}
