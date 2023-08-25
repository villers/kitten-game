export class RandomService {
  numberBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  numberBelow(limit: number): number {
    return this.numberBetween(0, limit);
  }
}
