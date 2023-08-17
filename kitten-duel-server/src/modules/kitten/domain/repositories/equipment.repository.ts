import { Equipment } from '../entities/equipment.entity';

export const EQUIPMENT_REPOSITORY = Symbol('EQUIPMENT_REPOSITORY');

export interface EquipmentRepository {
  save(equipment: Equipment): Promise<void>;
  findById(id: string): Promise<Equipment | null>;
  update(equipment: Equipment): Promise<void>;
  delete(id: string): Promise<void>;
  findByIds(equipmentIds: string[]): Promise<Equipment[]>;
}
