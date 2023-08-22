export class Kitten {
  id: string;
  name: string;
  power: number; // Attack power
  hp: number; // Hit points or health
  defense: number; // Defense against attacks
  speed: number; // Determines attack order, higher speed attacks first
  equipmentIds: string[];
  victories: number;
  defeats: number;
  level: number = 1;
  xp: number = 0; // Experience points accumulated by the kitten
  availableAttributePoints: number = 0; // Points available for distribution

  constructor(partial?: Partial<Kitten>) {
    Object.assign(this, partial);
  }

  isAlive(): boolean {
    return this.hp > 0;
  }
}
