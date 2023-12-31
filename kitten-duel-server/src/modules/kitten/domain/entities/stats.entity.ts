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

  getDefensePower(): number {
    // For now, setting defense power to be directly related to strength,
    // but this can be changed to be based on other stats or a combination of stats.
    return this.strength;
  }

  clone(): Stats {
    return new Stats({
      strength: this.strength,
      dexterity: this.dexterity,
      agility: this.agility,
      luck: this.luck,
      vitality: this.vitality,
    });
  }
}
