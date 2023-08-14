import { Equipment } from '../entities/equipment.entity';

export interface IEquipmentRepository {
  save(equipment: Equipment): Promise<void>;
  findById(id: string): Promise<Equipment | null>;
  update(equipment: Equipment): Promise<void>;
  delete(id: string): Promise<void>;
  // Additional methods for managing equipment can be added here
}
