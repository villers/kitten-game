import { Kitten } from '../entities/kitten.entity';

export const KITTEN_REPOSITORY = Symbol('KITTEN_REPOSITORY');

export interface KittenRepository {
  save(kitten: Kitten): Promise<void>;
  findById(id: string): Promise<Kitten | null>;

  /**
   * @param level number -> current player level,
   * @param id string -> current player id,
   * @param difference number -> level gap authorize between current player level and fighters level,
   * @param limit number -> number of combatants to propose
   * */
  findFightKittens(
    level: number,
    id: string,
    difference: number,
    limit: number,
  ): Promise<Kitten[] | null>;
  update(kitten: Kitten): Promise<void>;
  delete(id: string): Promise<void>;
}
