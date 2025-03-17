// ./utils/random/random-generator.ts

export interface RandomGenerator {
  random(): number;
  between(min: number, max: number): number;
  generateRandomBoolean(): boolean; // Ajout de la méthode
  getRandomKeyFromObject<T>(obj: T): keyof T; // Ajout de la méthode
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

  generateRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  getRandomKeyFromObject<T>(obj: T): keyof T {
    const keys = Object.keys(obj) as (keyof T)[];
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }
}

export class FixedRandomGenerator implements RandomGenerator {
  private seed: number;

  constructor(seed: number = 1) {
    this.seed = seed;
  }

  random(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  between(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  generateRandomBoolean(): boolean {
    return this.random() >= 0.5;
  }

  getRandomKeyFromObject<T>(obj: T): keyof T {
    const keys = Object.keys(obj) as (keyof T)[];
    const randomIndex = Math.floor(this.random() * keys.length);
    return keys[randomIndex];
  }
}
