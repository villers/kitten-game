import { Duel } from '../entities/duel.entity';

export interface IDuelRepository {
  save(duel: Duel): Promise<void>;
  findById(id: string): Promise<Duel | null>;
  update(duel: Duel): Promise<void>;
  delete(id: string): Promise<void>;
  // Additional methods for managing duels can be added here
}
