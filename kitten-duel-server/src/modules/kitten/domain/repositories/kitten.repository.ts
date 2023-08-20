import { Kitten } from '../entities/kitten.entity';

export const KITTEN_REPOSITORY = Symbol('KITTEN_REPOSITORY');

export interface KittenRepository {
  save(kitten: Kitten): Promise<void>;
  findById(id: string): Promise<Kitten | null>;
  findAllByLevel(level: number, id: string): Promise<Kitten[] | null>;
  update(kitten: Kitten): Promise<void>;
  delete(id: string): Promise<void>;
}
