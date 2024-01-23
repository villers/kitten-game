import { Fight } from '@game/game/fight/domain/fight';

export interface FightRepository {
  create(user: Fight): Promise<Fight>;
  findByName(name: string): Promise<Fight>;
  nameExist(name: string): Promise<boolean>;
}
