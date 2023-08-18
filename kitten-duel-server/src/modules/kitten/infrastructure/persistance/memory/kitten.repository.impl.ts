import { Kitten } from '../../../domain/entities/kitten.entity';
import { KittenRepository } from '../../../domain/repositories/kitten.repository';
import { Injectable } from '@nestjs/common';
import { KittenNotFoundException } from '../../../domain/exceptions/KittenNotFoundException';

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

    const kitten2 = new Kitten();
    kitten2.id = '2';
    kitten2.name = 'Obrigada';
    kitten2.power = 5;
    kitten2.hp = 10;
    kitten2.defense = 0;
    kitten2.speed = 10;
    kitten2.equipmentIds = [];

    this.kittens.set(kitten1.id, kitten1).set(kitten2.id, kitten2);
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
