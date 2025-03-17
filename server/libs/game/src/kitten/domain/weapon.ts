export class Weapon {
  constructor(
    private _name: string,
    private _damage: number,
    private _critMultiplier: number = 1.5,
  ) {}

  get name() {
    return this._name;
  }

  get damage() {
    return this._damage;
  }

  get critMultiplier() {
    return this._critMultiplier;
  }
}
