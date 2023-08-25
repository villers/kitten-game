export class KittenAddAttributePointsException extends Error {
  constructor(id: string) {
    super(`You can't add attribute points to kitten with id ${id}`);
  }
}
