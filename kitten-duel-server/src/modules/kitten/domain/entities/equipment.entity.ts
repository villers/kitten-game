export class Equipment {
  id: string;
  name: string;
  powerBoost: number;
  defenseBoost: number;
  speedBoost: number;

  constructor(partial?: Partial<Equipment>) {
    Object.assign(this, partial);
  }
}
