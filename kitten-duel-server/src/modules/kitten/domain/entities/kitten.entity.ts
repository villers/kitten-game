export const BASE_XP = 100;
const LEVEL_UP_ATTRIBUTE_POINTS = 5;

export class Kitten {
  id: string;
  name: string;
  strength: number; // Increases the attack power
  dexterity: number; // Increases hit chance
  agility: number; // Increases dodge chance and attack speed
  luck: number; // Increases critical hit chance
  vitality: number; // Increases the number of hit points
  hp: number; // Current hit points or health
  maxHp: number; // Max hit points, derived from vitality
  speed: number; // Determines attack order, higher speed attacks first
  skillIds: string[]; // List of skills the kitten possesses
  victories: number;
  defeats: number;
  level: number = 1;
  xp: number = 0; // Experience points accumulated by the kitten
  availableAttributePoints: number = 0; // Points available for distribution
  activeBuffs: { [skillName: string]: number } = {}; // Tracks active skill buffs and their remaining duration

  constructor(partial?: Partial<Kitten>) {
    Object.assign(this, partial);
    this.activeBuffs = { ...partial?.activeBuffs };
    this.maxHp = this.vitality * 10; // Assuming each vitality point gives 10 HP
    if (!this.hp) {
      // If current hp is not set, set it to maxHp
      this.hp = this.maxHp;
    }
  }

  isAlive(): boolean {
    return this.hp > 0;
  }

  getAttackPower(): number {
    let power = this.strength * 2; // Assuming each strength point gives 2 attack power
    if (this.hasBuff('GriffesAcerées')) {
      power *= 1.5; // 50% more power when Griffes Acerées is active
    }
    return power;
  }

  getHitChance(): number {
    // return this.dexterity * 2; // Convert dexterity to hit chance percentage
    return 100;
  }

  getDodgeChance(): number {
    // return this.agility * 2; // Convert agility to dodge chance percentage
    return 0;
  }

  getCriticalChance(): number {
    return this.luck; // Directly use luck as critical chance percentage
  }

  hasBuff(buffName: string): boolean {
    return !!this.activeBuffs[buffName];
  }

  applyBuff(buffName: string, duration: number): void {
    this.activeBuffs[buffName] = duration;
  }

  updateBuffs(): void {
    for (const buff in this.activeBuffs) {
      this.activeBuffs[buff]--;
      if (this.activeBuffs[buff] <= 0) {
        delete this.activeBuffs[buff];
      }
    }
  }

  /**
   * Set number of victories and xp gained for the winner kitten
   * @param xpGained
   */
  public setWinner(xpGained: number): void {
    this.victories += 1;
    this.xp += xpGained;
    this.checkForLevelUpAndAssignPoints();
  }

  /**
   * Set number of defeats for the loser kitten
   * */
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
