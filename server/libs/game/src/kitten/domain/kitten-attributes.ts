import { StatValue } from '@game/game/kitten/domain/stat-value';

export class KittenAttributes {
  constructor(
    private _hp: number,
    private _maxHp: number,
    private _endurance: StatValue,
    private _strength: StatValue,
    private _agility: StatValue,
    private _speed: StatValue,
  ) {}

  get hp() {
    return this._hp;
  }

  get maxHp() {
    return this._maxHp;
  }

  get endurance() {
    return this._endurance;
  }

  get strength() {
    return this._strength;
  }

  get agility() {
    return this._agility;
  }

  get speed() {
    return this._speed;
  }

  increaseStat(stat: string, amount: number) {
    switch (stat) {
      case 'endurance':
        this._endurance = StatValue.of(
          this._endurance.value + amount,
          this._endurance.modifier,
        );
        break;
      case 'strength':
        this._strength = StatValue.of(
          this._strength.value + amount,
          this._strength.modifier,
        );
        break;
      case 'agility':
        this._agility = StatValue.of(
          this._agility.value + amount,
          this._agility.modifier,
        );
        break;
      case 'speed':
        this._speed = StatValue.of(
          this._speed.value + amount,
          this._speed.modifier,
        );
        break;
    }
  }

  heal(amount: number) {
    this._hp += amount;
    if (this._hp > this._maxHp) {
      this._hp = this._maxHp;
    }
  }

  takeDamage(damage: number) {
    this._hp -= damage;
    if (this._hp < 0) this._hp = 0;
  }

  isAlive() {
    return this._hp > 0;
  }

  isDead() {
    return !this.isAlive();
  }

  calculateHP(level: number) {
    const baseHP = 50;
    const enduranceContribution = Math.max(this._endurance.finalValue, 0) * 6;
    const levelContribution = level * 0.25 * 6;
    this._hp = Math.floor(baseHP + enduranceContribution + levelContribution);
  }
}
