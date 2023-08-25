export class Stats {
  strength: number;
  dexterity: number;
  agility: number;
  luck: number;
  vitality: number;

  constructor(partial?: Partial<Stats>) {
    Object.assign(this, partial);
  }

  getAttackPower(): number {
    return this.strength * 2;
  }

  getHitChance(): number {
    return 100;
  }

  getDodgeChance(): number {
    return 0;
  }

  getCriticalChance(): number {
    return this.luck;
  }
}
