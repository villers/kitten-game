export class HealthSystem {
  private _hp: number;
  maxHp: number;

  constructor(vitality: number, hp?: number) {
    this.maxHp = vitality * 10;
    if (hp != null) {
      this._hp = hp;
    } else {
      this._hp = this.maxHp;
    }
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

  clone(): HealthSystem {
    return new HealthSystem(this.maxHp, this._hp);
  }
}
