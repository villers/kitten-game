import { FightEntity } from '../../../domain/entities/fight.entity';
import { FightRepository } from '../../../domain/repositories/fight.repository';
import { Injectable } from '@nestjs/common';
import { FightNotFoundException } from '../../../domain/exceptions/FightNotFoundException';

@Injectable()
export class FightRepositoryImpl implements FightRepository {
  private readonly fights = new Map<string, FightEntity>();

  async save(duel: FightEntity): Promise<void> {
    this.fights.set(duel.id, duel);
  }

  async findById(id: string): Promise<FightEntity | null> {
    const exists = this.fights.has(id);

    if (!exists) {
      throw new FightNotFoundException(id);
    }

    return this.fights.get(id);
  }

  async update(duel: FightEntity): Promise<void> {
    const exists = this.fights.has(duel.id);

    if (!exists) {
      throw new FightNotFoundException(duel.id);
    }

    this.fights.set(duel.id, duel);
  }

  async delete(id: string): Promise<void> {
    const exists = this.fights.has(id);

    if (!exists) {
      throw new FightNotFoundException(id);
    }

    this.fights.delete(id);
  }
}
