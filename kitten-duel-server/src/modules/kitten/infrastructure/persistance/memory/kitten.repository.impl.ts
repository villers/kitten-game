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
    kitten1.power = 5;
    kitten1.hp = 10;
    kitten1.defense = 0;
    kitten1.speed = 10;
    kitten1.equipmentIds = [];
    kitten1.level = 1;
    kitten1.victories = 5;
    kitten1.defeats = 0;

    const kitten2 = new Kitten();
    kitten2.id = '2';
    kitten2.name = 'Obrigada';
    kitten2.power = 5;
    kitten2.hp = 10;
    kitten2.defense = 0;
    kitten2.speed = 10;
    kitten2.equipmentIds = [];
    kitten2.level = 8;
    kitten2.victories = 10;
    kitten2.defeats = 10;

    const kitten3 = new Kitten();
    kitten3.id = '3';
    kitten3.name = 'Milo';
    kitten3.power = 4;
    kitten3.hp = 10;
    kitten3.defense = 0;
    kitten3.speed = 10;
    kitten3.equipmentIds = [];
    kitten3.level = 3;
    kitten3.victories = 10;
    kitten3.defeats = 0;

    const kitten4 = new Kitten();
    kitten4.id = '4';
    kitten4.name = 'Florian';
    kitten4.power = 4;
    kitten4.hp = 10;
    kitten4.defense = 0;
    kitten4.speed = 10;
    kitten4.equipmentIds = [];
    kitten4.level = 0;
    kitten4.victories = 10;
    kitten4.defeats = 0;

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

  async findAllByLevel(level: number, id: string): Promise<Kitten[] | null> {
    if (this.kittens.size === 0) {
      throw new KittensNotFoundException(level);
    }

    const results = [...this.kittens.values()].filter(
      (kitten) =>
        level + 3 >= kitten.level &&
        level - 3 <= kitten.level &&
        kitten.id !== id,
    );

    if (results.length >= 8) {
      return results.slice(8);
    }

    return results;
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
