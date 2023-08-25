import { Kitten } from '../../../domain/entities/kitten.entity';
import { KittenRepository } from '../../../domain/repositories/kitten.repository';
import { Injectable } from '@nestjs/common';
import { KittenNotFoundException } from '../../../domain/exceptions/KittenNotFoundException';
import { KittensNotFoundException } from '../../../domain/exceptions/KittensNotFoundException';
import { LevelingSystem } from '../../../domain/entities/leveling-system.entity';
import { HealthSystem } from '../../../domain/entities/health-system.entity';
import { Stats } from '../../../domain/entities/stats.entity';

@Injectable()
export class KittenRepositoryImpl implements KittenRepository {
  private readonly kittens = new Map<string, Kitten>();

  constructor() {
    this.createKitten({
      id: '1',
      name: 'Moka',
    });

    this.createKitten({
      id: '2',
      name: 'Obrigada',
    });

    this.createKitten({
      id: '3',
      name: 'Milo',
    });

    this.createKitten({
      id: '4',
      name: 'Florian',
    });
  }

  private createKitten(data: { id: string; name: string }) {
    const stats = new Stats({
      strength: 5,
      dexterity: 5,
      vitality: 5,
      luck: 5,
      agility: 5,
    });
    const healthSystem = new HealthSystem(stats.vitality);
    const levelingSystem = new LevelingSystem();
    const kitten = new Kitten({
      id: data.id,
      name: data.name,
      stats: stats,
      healthSystem: healthSystem,
      levelingSystem: levelingSystem,
    });
    this.kittens.set(kitten.id, kitten);
  }

  async save(kitten: Kitten): Promise<void> {
    this.kittens.set(kitten.id, kitten);
  }

  async findById(id: string): Promise<Kitten | null> {
    const exists = this.kittens.has(id);

    if (!exists) {
      throw new KittenNotFoundException(id);
    }

    return this.kittens.get(id);
  }

  async findFightKittens(
    level: number,
    id: string,
    difference: number,
    limit: number,
  ): Promise<Kitten[] | null> {
    if (this.kittens.size === 0) {
      throw new KittensNotFoundException(level);
    }

    const results = [...this.kittens.values()].filter(
      (kitten) =>
        level + difference >= kitten.levelingSystem.level &&
        level - difference <= kitten.levelingSystem.level &&
        kitten.id !== id,
    );

    return results.slice(0, limit);
  }

  async update(kitten: Kitten): Promise<void> {
    const exists = this.kittens.has(kitten.id);

    if (!exists) {
      throw new KittenNotFoundException(kitten.id);
    }

    this.kittens.set(kitten.id, kitten);
  }

  async delete(id: string): Promise<void> {
    const exists = this.kittens.has(id);

    if (!exists) {
      throw new KittenNotFoundException(id);
    }

    this.kittens.delete(id);
  }
}
