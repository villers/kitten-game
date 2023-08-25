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
    Object.assign(this, partial);
  }

  clone(): Kitten {
    return new Kitten({
      id: this.id,
      name: this.name,
      stats: this.stats.clone(),
      healthSystem: this.healthSystem.clone(),
      levelingSystem: this.levelingSystem.clone(),
    });
  }
}
