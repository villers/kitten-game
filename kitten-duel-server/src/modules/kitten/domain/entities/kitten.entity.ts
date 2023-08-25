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
  //hp: number; // Current hit points or health
  private _hp: number;
  maxHp: number; // Max hit points, derived from vitality
  speed: number; // Determines attack order, higher speed attacks first
  skillIds: string[] = []; // List of skills the kitten possesses
  victories: number;
  defeats: number;
  level: number = 1;
  xp: number = 0; // Experience points accumulated by the kitten
  availableAttributePoints: number = 0; // Points available for distribution
  activeBuffs: { [skillName: string]: number } = {}; // Tracks active skill buffs and their remaining duration

  constructor(partial?: Partial<Kitten>) {
    Object.assign(this, partial);
    this.maxHp = this.vitality * 10; // Assuming each vitality point gives 10 HP

    if (!this.hp) {
      this.hp = this.maxHp;
    }
  }

  isAlive(): boolean {
    return this.hp > 0;
  }

  get hp(): number {
    return this._hp;
  }

  set hp(value: number) {
    this._hp = Math.max(0, value); // Ensure HP doesn't go below 0
  }

  dealDamage(damage: number): void {
    this._hp = Math.max(0, this._hp - damage);
  }

  heal(amount: number): void {
    this._hp += amount;
    // Vous pouvez également ajouter une logique pour garantir que les HP ne dépassent pas un certain maximum
  }

  getAttackPower(): number {
    // Assuming each strength point gives 2 attack power
    return this.strength * 2;
  }

  getHitChance(): number {
    // return this.dexterity * 2; // disable this because it's too strong and make the fight too long or infinite
    return 100;
  }

  getDodgeChance(): number {
    // return this.agility * 2; // disable this because it's too strong and make the fight too long or infinite
    return 0;
  }

  getCriticalChance(): number {
    return this.luck; // Directly use luck as critical chance percentage
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

  clone(): Kitten {
    const clonedKitten = new Kitten();
    clonedKitten.id = this.id;
    clonedKitten.name = this.name;
    clonedKitten.strength = this.strength;
    clonedKitten.dexterity = this.dexterity;
    clonedKitten.agility = this.agility;
    clonedKitten.luck = this.luck;
    clonedKitten.vitality = this.vitality;
    clonedKitten.hp = this.hp;
    clonedKitten.maxHp = this.maxHp;
    clonedKitten.speed = this.speed;
    clonedKitten.skillIds = [...this.skillIds];
    clonedKitten.victories = this.victories;
    clonedKitten.defeats = this.defeats;
    clonedKitten.level = this.level;
    clonedKitten.xp = this.xp;
    clonedKitten.availableAttributePoints = this.availableAttributePoints;
    clonedKitten.activeBuffs = { ...this.activeBuffs };

    return clonedKitten;
  }
}
