import { FightEntity } from '../entities/fight.entity';

export const FIGHT_REPOSITORY = Symbol('FIGHT_REPOSITORY');

export interface FightRepository {
  save(duel: FightEntity): Promise<void>;
  findById(id: string): Promise<FightEntity | null>;
  update(duel: FightEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
