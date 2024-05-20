export interface RandomGenerator {
  random(): number;
  between(min: number, max: number): number;
}

export class DefaultRandomGenerator implements RandomGenerator {
  random(): number {
    return Math.random();
  }

  between(min: number, max: number): number {
    if (min > max) return 0;
    if (min === max) return min;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
