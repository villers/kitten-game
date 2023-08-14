import { Equipment } from '../../../domain/entities/equipment.entity';
import { IEquipmentRepository } from '../../../domain/repositories/iequipment-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EquipmentRepository implements IEquipmentRepository {
  private equipments: Equipment[] = [];

  constructor() {
    const equipment1 = new Equipment();
    equipment1.id = '1';
    equipment1.name = 'Griffe asséré';
    equipment1.powerBoost = 10;

    this.equipments.push(equipment1);
  }

  async save(equipment: Equipment): Promise<void> {
    const existingIndex = this.equipments.findIndex(
      (e) => e.id === equipment.id,
    );
    if (existingIndex > -1) {
      this.equipments[existingIndex] = equipment;
    } else {
      this.equipments.push(equipment);
    }
  }

  async findById(id: string): Promise<Equipment | null> {
    const equipment = this.equipments.find((e) => e.id === id);
    return equipment || null;
  }

  async update(equipment: Equipment): Promise<void> {
    const existingIndex = this.equipments.findIndex(
      (e) => e.id === equipment.id,
    );
    if (existingIndex > -1) {
      this.equipments[existingIndex] = equipment;
    }
    // Note: If equipment doesn't exist, we might want to throw an error or handle it appropriately
  }

  async delete(id: string): Promise<void> {
    this.equipments = this.equipments.filter((e) => e.id !== id);
  }
}
