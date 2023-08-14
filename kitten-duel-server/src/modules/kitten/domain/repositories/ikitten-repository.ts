import { Kitten } from '../entities/kitten.entity';

export interface IKittenRepository {
  save(kitten: Kitten): Promise<void>;
  findById(id: string): Promise<Kitten | null>;
  update(kitten: Kitten): Promise<void>;
  delete(id: string): Promise<void>;
  // Additional methods for managing kittens can be added here
}
