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

  constructor(partial?: Partial<Kitten>) {
    Object.assign(this, partial);
  }
}
