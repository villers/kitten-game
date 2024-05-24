import { BattleRepository } from '../application/battle.repository';
import { Battle } from '../domain/battle';

export class InMemoryBattleRepository implements BattleRepository {
  private autoincrement = 1;
  private battles = new Map<number, Battle>();

  async create(battle: Battle): Promise<Battle> {
    if (!battle.id) {
      battle.id = this.autoincrement++;
    }

    this.save(battle);
    return Promise.resolve(battle);
  }

  async findById(id: number): Promise<Battle | undefined> {
    return Promise.resolve(this.battles.get(id));
  }

  async update(battle: Battle): Promise<Battle> {
    if (this.battles.has(battle.id)) {
      this.save(battle);
      return Promise.resolve(battle);
    }
    throw new Error(`Battle with id ${battle.id} not found`);
  }

  private save(battle: Battle) {
    this.battles.set(battle.id, battle);
  }
}
