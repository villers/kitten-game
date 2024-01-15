import { User } from '@game/game/user/domain/user';
import { BRUTE_STARTING_POINTS } from '@game/game/kitten/application/usecases/create-kitten.usecase';
import { randomBetween } from '@game/game/kitten/utils/random';

export const SkillName: {
  felineAgility: 'felineAgility';
} = {
  felineAgility: 'felineAgility',
};
export type SkillName = (typeof SkillName)[keyof typeof SkillName];

export const WeaponName: {
  sword: 'sword';
} = {
  sword: 'sword',
};
export type WeaponName = (typeof WeaponName)[keyof typeof WeaponName];

export class Kitten {
  constructor(
    private _id: number,
    private _name: string,
    private _user: User,
    private _level: number = 1,
    private _xp: number = 0,
    private _hp: number = 0,
    private _enduranceStat: number = 0,
    private _enduranceModifier: number = 1,
    private _enduranceValue: number = 0,
    private _strengthStat: number = 0,
    private _strengthModifier: number = 1,
    private _strengthValue: number = 0,
    private _agilityStat: number = 0,
    private _agilityModifier: number = 1,
    private _agilityValue: number = 0,
    private _speedStat: number = 0,
    private _speedModifier: number = 1,
    private _speedValue: number = 0,
    private _skills: SkillName[] = [],
    private _weapons: WeaponName[] = [],
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get user() {
    return this._user;
  }

  get level() {
    return this._level;
  }

  get xp() {
    return this._xp;
  }

  get hp() {
    return this._hp;
  }

  get enduranceStat() {
    return this._enduranceStat;
  }

  get enduranceModifier() {
    return this._enduranceModifier;
  }

  get enduranceValue() {
    return this._enduranceValue;
  }

  get strengthStat() {
    return this._strengthStat;
  }

  get strengthModifier() {
    return this._strengthModifier;
  }

  get strengthValue() {
    return this._strengthValue;
  }

  get agilityStat() {
    return this._agilityStat;
  }

  get agilityModifier() {
    return this._agilityModifier;
  }

  get agilityValue() {
    return this._agilityValue;
  }

  get speedStat() {
    return this._speedStat;
  }

  get speedModifier() {
    return this._speedModifier;
  }

  get speedValue() {
    return this._speedValue;
  }

  get skills() {
    return this._skills;
  }

  get weapons() {
    return this._weapons;
  }

  editName(name: string) {
    this._name = name;
  }

  editLevel(level: number) {
    this._level = level;
  }

  editXp(xp: number) {
    this._xp = xp;
  }

  editHp(hp: number) {
    this._hp = hp;
  }

  editEnduranceStat(enduranceStat: number) {
    this._enduranceStat = enduranceStat;
  }

  editEnduranceModifier(enduranceModifier: number) {
    this._enduranceModifier = enduranceModifier;
  }

  editEnduranceValue(enduranceValue: number) {
    this._enduranceValue = enduranceValue;
  }

  editStrengthStat(strengthStat: number) {
    this._strengthStat = strengthStat;
  }

  editStrengthModifier(strengthModifier: number) {
    this._strengthModifier = strengthModifier;
  }

  editStrengthValue(strengthValue: number) {
    this._strengthValue = strengthValue;
  }

  editAgilityStat(agilityStat: number) {
    this._agilityStat = agilityStat;
  }

  editAgilityModifier(agilityModifier: number) {
    this._agilityModifier = agilityModifier;
  }

  editAgilityValue(agilityValue: number) {
    this._agilityValue = agilityValue;
  }

  editSpeedStat(speedStat: number) {
    this._speedStat = speedStat;
  }

  editSpeedModifier(speedModifier: number) {
    this._speedModifier = speedModifier;
  }

  editSpeedValue(speedValue: number) {
    this._speedValue = speedValue;
  }

  editSkills(skills: SkillName[]) {
    this._skills = skills;
  }

  editWeapons(weapons: WeaponName[]) {
    this._weapons = weapons;
  }

  editUser(user: User) {
    this._user = user;
  }

  editId(id) {
    this._id = id;
  }

  calculateInitialStats() {
    const perk = this.getRandomBonus();

    this._skills = perk.type === 'skill' ? [perk.name as SkillName] : [];
    this._weapons = perk.type === 'weapon' ? [perk.name as WeaponName] : [];

    if (perk.type === 'skill') {
      this.applySkillModifiers(perk.name);
    }
    this.allocateStatsPoints();
    this.calculateFinalValues();
  }

  private getRandomBonus(): { type: 'skill' | 'weapon'; name: string } {
    return Math.random() > 0.5
      ? { type: 'skill', name: SkillName.felineAgility }
      : { type: 'weapon', name: WeaponName.sword };
  }

  private applySkillModifiers(skill: string) {
    if (skill === SkillName.felineAgility) {
      this.editAgilityModifier(this.agilityModifier * 1.5);
      this.editAgilityStat(3);
    }
  }

  private allocateStatsPoints() {
    let availablePoints = BRUTE_STARTING_POINTS;

    const endurancePoints = randomBetween(2, 5);
    this.editEnduranceStat(endurancePoints);
    availablePoints -= endurancePoints;

    const strengthPoints = Math.min(
      randomBetween(2, 5),
      availablePoints - 2 * 2,
    );
    this.editStrengthStat(strengthPoints);
    availablePoints -= strengthPoints;

    const agilityPoints = Math.min(
      randomBetween(2, 5),
      availablePoints - 2 * 1,
    );
    this.editAgilityStat(agilityPoints);
    availablePoints -= agilityPoints;

    this.editSpeedStat(availablePoints);
  }

  private calculateFinalValues() {
    this.editEnduranceValue(
      Math.floor(this.enduranceStat * this.enduranceModifier),
    );
    this.editStrengthValue(
      Math.floor(this.strengthStat * this.strengthModifier),
    );
    this.editAgilityValue(Math.floor(this.agilityStat * this.agilityModifier));
    this.editSpeedValue(Math.floor(this.speedStat * this.speedModifier));

    this.editHp(this.calculateHP());
  }

  private calculateHP() {
    const baseHP = 50;
    const enduranceContribution = Math.max(this.enduranceValue, 0) * 6;
    const levelContribution = this.level * 0.25 * 6;
    return Math.floor(baseHP + enduranceContribution + levelContribution);
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      user: this.user,
      level: this.level,
      xp: this.xp,
      hp: this.hp,
      enduranceStat: this.enduranceStat,
      enduranceModifier: this.enduranceModifier,
      enduranceValue: this.enduranceValue,
      strengthStat: this.strengthStat,
      strengthModifier: this.strengthModifier,
      strengthValue: this.strengthValue,
      agilityStat: this.agilityStat,
      agilityModifier: this.agilityModifier,
      agilityValue: this.agilityValue,
      speedStat: this.speedStat,
      speedModifier: this.speedModifier,
      speedValue: this.speedValue,
      skills: this.skills,
      weapons: this.weapons,
    };
  }

  static fromData(data: Kitten['data']) {
    return new Kitten(
      data.id,
      data.name,
      User.fromData(data.user),
      data.level,
      data.xp,
      data.hp,
      data.enduranceStat,
      data.enduranceModifier,
      data.enduranceValue,
      data.strengthStat,
      data.strengthModifier,
      data.strengthValue,
      data.agilityStat,
      data.agilityModifier,
      data.agilityValue,
      data.speedStat,
      data.speedModifier,
      data.speedValue,
      data.skills,
      data.weapons,
    );
  }
}
