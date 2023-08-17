export class KittenNotFoundException extends Error {
  constructor(id: string) {
    super(`Kitten with id ${id} not found`);
  }
}
