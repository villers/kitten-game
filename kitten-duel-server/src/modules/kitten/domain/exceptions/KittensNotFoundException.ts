export class KittensNotFoundException extends Error {
  constructor(level: number) {
    super(`No kittens to fitght with your level ${level}`);
  }
}
