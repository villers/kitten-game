import { Kitten } from '../../../domain/entities/kitten.entity';
import { KittenRepository } from '../../../domain/repositories/kitten.repository';
import { Injectable } from '@nestjs/common';
import { KittenNotFoundException } from '../../../domain/exceptions/KittenNotFoundException';
import { KittensNotFoundException } from '../../../domain/exceptions/KittensNotFoundException';

@Injectable()
export class KittenRepositoryImpl implements KittenRepository {
  private readonly kittens = new Map<string, Kitten>();

  constructor() {
    const kitten1 = new Kitten();
    kitten1.id = '1';
    kitten1.name = 'Moka';
    kitten1.strength = 5;
    kitten1.dexterity = 5;
    kitten1.vitality = 5;
    kitten1.luck = 5;
    kitten1.agility = 5;
    kitten1.level = 1;
    kitten1.victories = 0;
    kitten1.defeats = 0;
    kitten1.xp = 0;

    const kitten2 = new Kitten();
    kitten2.id = '2';
    kitten2.name = 'Obrigada';
    kitten2.strength = 5;
    kitten2.dexterity = 5;
    kitten2.vitality = 5;
    kitten2.luck = 5;
    kitten2.agility = 5;
    kitten2.level = 1;
    kitten2.victories = 0;
    kitten2.defeats = 0;
    kitten2.xp = 0;

    const kitten3 = new Kitten();
    kitten3.id = '3';
    kitten3.name = 'Milo';
    kitten3.strength = 5;
    kitten3.dexterity = 5;
    kitten3.vitality = 5;
    kitten3.luck = 5;
    kitten3.agility = 5;
    kitten3.level = 1;
    kitten3.victories = 0;
    kitten3.defeats = 0;
    kitten3.xp = 0;

    const kitten4 = new Kitten();
    kitten4.id = '4';
    kitten4.name = 'Florian';
    kitten4.strength = 5;
    kitten4.dexterity = 5;
    kitten4.vitality = 5;
    kitten4.luck = 5;
    kitten4.agility = 5;
    kitten4.level = 1;
    kitten4.victories = 0;
    kitten4.defeats = 0;
    kitten4.xp = 0;

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
