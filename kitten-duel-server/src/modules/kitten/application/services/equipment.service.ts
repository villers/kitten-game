import { Inject, Injectable } from '@nestjs/common';
import { Equipment } from '../../domain/entities/equipment.entity';
import { IEquipmentRepository } from '../../domain/repositories/iequipment-repository';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject('IEquipmentRepository')
    private readonly equipmentRepository: IEquipmentRepository,
  ) {}

  async addEquipment(equipment: Equipment): Promise<void> {
    // You can add business logic or validation here
    await this.equipmentRepository.save(equipment);
  }

  async getEquipmentById(id: string): Promise<Equipment | null> {
    return await this.equipmentRepository.findById(id);
  }

  async updateEquipment(equipment: Equipment): Promise<void> {
    // You can add business logic or validation here
    await this.equipmentRepository.update(equipment);
  }

  async deleteEquipment(id: string): Promise<void> {
    await this.equipmentRepository.delete(id);
  }
}
