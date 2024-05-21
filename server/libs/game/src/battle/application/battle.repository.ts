import { Battle } from '../domain/battle';

export interface BattleRepository {
  create(battle: Battle): Promise<Battle>;
  findById(id: number): Promise<Battle | null>;
  update(battle: Battle): Promise<Battle>;
}
