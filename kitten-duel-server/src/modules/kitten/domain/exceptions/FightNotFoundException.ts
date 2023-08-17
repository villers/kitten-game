export class FightNotFoundException extends Error {
  constructor(id: string) {
    super(`Fight with id ${id} not found`);
  }
}
