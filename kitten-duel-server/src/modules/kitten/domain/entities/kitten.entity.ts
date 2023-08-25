import { Stats } from './stats.entity';
import { LevelingSystem } from './leveling-system.entity';
import { HealthSystem } from './health-system.entity';

export class Kitten {
  id: string;
  name: string;
  stats: Stats;
  levelingSystem: LevelingSystem;
  healthSystem: HealthSystem;
  skillIds: string[] = [];
  activeBuffs: { [skillName: string]: number } = {};

  constructor(partial?: Partial<Kitten>) {
    this.stats = new Stats(partial?.stats);
    this.levelingSystem = new LevelingSystem(partial?.levelingSystem);
    this.healthSystem = new HealthSystem(this.stats.vitality);
    Object.assign(this, partial);
  }

  clone(): Kitten {
    return new Kitten({
      id: this.id,
      name: this.name,
      stats: new Stats({
        strength: this.stats.strength,
        dexterity: this.stats.dexterity,
        vitality: this.stats.vitality,
        luck: this.stats.luck,
        agility: this.stats.agility,
      }),
      healthSystem: new HealthSystem(this.stats.vitality),
      levelingSystem: new LevelingSystem(),
    });
  }
}
