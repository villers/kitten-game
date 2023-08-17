export class EquipmentNotFoundException extends Error {
  constructor(id: string) {
    super(`Equipment with id ${id} not found`);
  }
}
