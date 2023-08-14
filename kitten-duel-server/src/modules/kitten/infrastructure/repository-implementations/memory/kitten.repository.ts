import { Kitten } from '../../../domain/entities/kitten.entity';
import { IKittenRepository } from '../../../domain/repositories/ikitten-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KittenRepository implements IKittenRepository {
  private kittens: Kitten[] = [];

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

    this.kittens.push(kitten1, kitten2);
  }

  async save(kitten: Kitten): Promise<void> {
    const existingIndex = this.kittens.findIndex((k) => k.id === kitten.id);
    if (existingIndex > -1) {
      this.kittens[existingIndex] = kitten;
    } else {
      this.kittens.push(kitten);
    }
  }

  async findById(id: string): Promise<Kitten | null> {
    const kitten = this.kittens.find((k) => k.id === id);
    return kitten || null;
  }

  async update(kitten: Kitten): Promise<void> {
    const existingIndex = this.kittens.findIndex((k) => k.id === kitten.id);
    if (existingIndex > -1) {
      this.kittens[existingIndex] = kitten;
    }
    // Note: If kitten doesn't exist, we might want to throw an error or handle it appropriately
  }

  async delete(id: string): Promise<void> {
    this.kittens = this.kittens.filter((k) => k.id !== id);
  }
}
