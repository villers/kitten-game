import { Kitten } from '../../../domain/entities/kitten.entity';
import { KittenRepository } from '../../../domain/repositories/kitten.repository';
import { Injectable } from '@nestjs/common';
import { KittenNotFoundException } from '../../../domain/exceptions/KittenNotFoundException';
import { KittensNotFoundException } from '../../../domain/exceptions/KittensNotFoundException';

@Injectable()
export class KittenRepositoryImpl implements KittenRepository {
  private readonly kittens = new Map<string, Kitten>();

  constructor() {
    const kitten1 = new Kitten({
      id: '1',
      name: 'Moka',
      strength: 5,
      dexterity: 5,
      vitality: 5,
      luck: 5,
      agility: 5,
      level: 1,
      victories: 0,
      defeats: 0,
      xp: 0,
    });

    const kitten2 = new Kitten({
      id: '2',
      name: 'Obrigada',
      strength: 5,
      dexterity: 5,
      vitality: 5,
      luck: 5,
      agility: 5,
      level: 1,
      victories: 0,
      defeats: 0,
      xp: 0,
    });

    const kitten3 = new Kitten({
      id: '3',
      name: 'Milo',
      strength: 5,
      dexterity: 5,
      vitality: 5,
      luck: 5,
      agility: 5,
      level: 1,
      victories: 0,
      defeats: 0,
      xp: 0,
    });

    const kitten4 = new Kitten({
      id: '4',
      name: 'Florian',
      strength: 5,
      dexterity: 5,
      vitality: 5,
      luck: 5,
      agility: 5,
      level: 1,
      victories: 0,
      defeats: 0,
      xp: 0,
    });

    this.kittens
      .set(kitten1.id, kitten1)
      .set(kitten2.id, kitten2)
      .set(kitten3.id, kitten3)
      .set(kitten4.id, kitten4);
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
        level + difference >= kitten.level &&
        level - difference <= kitten.level &&
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
