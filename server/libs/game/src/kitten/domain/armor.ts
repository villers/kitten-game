export class Armor {
  constructor(
    private _name: string,
    private _defense: number,
    private _critReduction: number = 0.25,
  ) {}

  get name() {
    return this._name;
  }

  get defense() {
    return this._defense;
  }

  get critReduction() {
    return this._critReduction;
  }
}
