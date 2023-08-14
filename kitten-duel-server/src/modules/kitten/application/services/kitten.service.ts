import { Inject, Injectable } from '@nestjs/common';
import { Kitten } from '../../domain/entities/kitten.entity';
import { IKittenRepository } from '../../domain/repositories/ikitten-repository';

@Injectable()
export class KittenService {
  constructor(
    @Inject('IKittenRepository')
    private readonly kittenRepository: IKittenRepository,
  ) {}

  async addKitten(kitten: Kitten): Promise<void> {
    // You can add business logic or validation here
    await this.kittenRepository.save(kitten);
  }

  async getKittenById(id: string): Promise<Kitten | null> {
    return await this.kittenRepository.findById(id);
  }

  async updateKitten(kitten: Kitten): Promise<void> {
    // You can add business logic or validation here
    await this.kittenRepository.update(kitten);
  }

  async deleteKitten(id: string): Promise<void> {
    await this.kittenRepository.delete(id);
  }

  // You can add more methods related to kittens here
}
