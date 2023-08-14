import { Duel } from '../../../domain/entities/duel.entity';
import { IDuelRepository } from '../../../domain/repositories/iduel-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DuelRepository implements IDuelRepository {
  private duels: Duel[] = [];

  async save(duel: Duel): Promise<void> {
    const existingIndex = this.duels.findIndex((d) => d.id === duel.id);
    if (existingIndex > -1) {
      this.duels[existingIndex] = duel;
    } else {
      this.duels.push(duel);
    }
  }

  async findById(id: string): Promise<Duel | null> {
    const duel = this.duels.find((d) => d.id === id);
    return duel || null;
  }

  async update(duel: Duel): Promise<void> {
    const existingIndex = this.duels.findIndex((d) => d.id === duel.id);
    if (existingIndex > -1) {
      this.duels[existingIndex] = duel;
    }
    // Note: If duel doesn't exist, we might want to throw an error or handle it appropriately
  }

  async delete(id: string): Promise<void> {
    this.duels = this.duels.filter((d) => d.id !== id);
  }
}
