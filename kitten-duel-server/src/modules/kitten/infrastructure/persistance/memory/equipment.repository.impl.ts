import { Equipment } from '../../../domain/entities/equipment.entity';
import { EquipmentRepository } from '../../../domain/repositories/equipment.repository';
import { Injectable } from '@nestjs/common';
import { EquipmentNotFoundException } from '../../../domain/exceptions/EquipmentNotFoundException';

@Injectable()
export class EquipmentRepositoryImpl implements EquipmentRepository {
  private readonly equipments = new Map<string, Equipment>();

  constructor() {
    const equipment1 = new Equipment();
    equipment1.id = '1';
    equipment1.name = 'Griffe asséré';
    equipment1.powerBoost = 10;

    this.equipments.set(equipment1.id, equipment1);
  }

  async save(equipment: Equipment): Promise<void> {
    this.equipments.set(equipment.id, equipment);
  }

  async findById(id: string): Promise<Equipment | null> {
    const exists = this.equipments.has(id);

    if (!exists) {
      throw new EquipmentNotFoundException(id);
    }

    return this.equipments.get(id);
  }

  async update(equipment: Equipment): Promise<void> {
    const exists = this.equipments.has(equipment.id);

    if (!exists) {
      throw new EquipmentNotFoundException(equipment.id);
    }

    this.equipments.set(equipment.id, equipment);
  }

  async delete(id: string): Promise<void> {
    const exists = this.equipments.has(id);

    if (!exists) {
      throw new EquipmentNotFoundException(id);
    }

    this.equipments.delete(id);
  }

  async findByIds(equipmentIds: string[]): Promise<Equipment[]> {
    const equipments: Equipment[] = [];

    for (const id of equipmentIds) {
      const exists = this.equipments.has(id);

      if (!exists) {
        throw new EquipmentNotFoundException(id);
      }

      equipments.push(this.equipments.get(id));
    }

    return equipments;
  }
}
