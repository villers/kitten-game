export const BASE_XP = 100;
const LEVEL_UP_ATTRIBUTE_POINTS = 5;

export class LevelingSystem {
  level: number = 1;
  xp: number = 0;
  victories: number;
  defeats: number;
  availableAttributePoints: number = 0;

  constructor(partial?: Partial<LevelingSystem>) {
    Object.assign(this, partial);
  }

  public setWinner(xpGained: number): void {
    this.victories += 1;
    this.xp += xpGained;
    this.checkForLevelUpAndAssignPoints();
  }

  public setLoser(): void {
    this.defeats += 1;
  }

  private checkForLevelUpAndAssignPoints(): void {
    const xpRequiredForNextLevel = this.level ** 2 * BASE_XP;
    while (this.xp >= xpRequiredForNextLevel) {
      this.level++;
      this.xp -= xpRequiredForNextLevel;
      this.availableAttributePoints += LEVEL_UP_ATTRIBUTE_POINTS;
    }
  }
}
