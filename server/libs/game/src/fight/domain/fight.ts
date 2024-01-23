import { Kitten } from '@game/game/kitten/domain/kitten';

export class Fight {
  constructor(
    private _id: number,
    private _attacker: Kitten,
    private _defender: Kitten,
  ) {}

  get id(): number {
    return this._id;
  }

  get attacker(): Kitten {
    return this._attacker;
  }

  get defender(): Kitten {
    return this._defender;
  }

  set id(id: number) {
    this._id = id;
  }

  set attacker(attacker: Kitten) {
    this._attacker = attacker;
  }

  set defender(defender: Kitten) {
    this._defender = defender;
  }

  get data() {
    return {
      id: this.id,
      attacker: this.attacker,
      defender: this.defender,
    };
  }

  static fromData(data: Fight['data']) {
    return new Fight(data.id, data.attacker, data.defender);
  }
}
