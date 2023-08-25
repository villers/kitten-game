export class HealthSystem {
  private _hp: number;
  maxHp: number;

  constructor(vitality: number) {
    this.maxHp = vitality * 10;
    this._hp = this.maxHp;
  }

  isAlive(): boolean {
    return this._hp > 0;
  }

  get hp(): number {
    return this._hp;
  }

  set hp(value: number) {
    this._hp = Math.max(0, value);
  }

  dealDamage(damage: number): void {
    this._hp = Math.max(0, this._hp - damage);
  }

  heal(amount: number): void {
    this._hp += amount;
  }
}
