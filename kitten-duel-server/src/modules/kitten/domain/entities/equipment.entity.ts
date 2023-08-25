export class Equipment {
  id: string;
  name: string;
  powerBoost: number;
  defenseBoost: number;
  speedBoost: number;

  constructor(partial?: Partial<Equipment>) {
    Object.assign(this, partial);
  }

  clone(): Equipment {
    return new Equipment({
      id: this.id,
      name: this.name,
      powerBoost: this.powerBoost,
      defenseBoost: this.defenseBoost,
      speedBoost: this.speedBoost,
    });
  }
}
