import { Kitten } from '@game/game/kitten/domain/kitten';

export interface KittenRepository {
  create(user: Kitten): Promise<Kitten>;
  findByName(name: string): Promise<Kitten>;
  nameExist(name: string): Promise<boolean>;
}
