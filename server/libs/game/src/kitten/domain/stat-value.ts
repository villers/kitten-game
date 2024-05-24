export class StatValue {
  private constructor(
    readonly value: number,
    readonly modifier: number = 1,
  ) {}

  static of(value: number, modifier: number = 1): StatValue {
    return new StatValue(value, modifier);
  }

  get finalValue() {
    return Math.floor(this.value * this.modifier);
  }
}
