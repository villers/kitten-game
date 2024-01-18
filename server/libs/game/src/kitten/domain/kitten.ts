import { User } from '@game/game/user/domain/user';
import { randomBetween } from '@game/game/kitten/utils/random';
import { StatValue } from '@game/game/kitten/domain/stats-value';

export class UserNotFoundForKittenCreationError extends Error {}
export class KittenNameAlreadyExistError extends Error {}

export const BRUTE_STARTING_POINTS = 11;

export enum SkillNameEnum {
  felineAgility = 'felineAgility',
}
export type SkillName = keyof typeof SkillNameEnum;

export enum WeaponNameEnum {
  sword = 'sword',
}
export type WeaponName = keyof typeof WeaponNameEnum;

export class Kitten {
  constructor(
    private _id: number,
    private _name: string,
    private _user: User,
    private _level: number = 1,
    private _xp: number = 0,
    private _hp: number = 0,
    private _endurance: StatValue = StatValue.of(0),
    private _strength: StatValue = StatValue.of(0),
    private _agility: StatValue = StatValue.of(0),
    private _speed: StatValue = StatValue.of(0),
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

  get endurance() {
    return this._endurance;
  }

  get strength() {
    return this._strength;
  }

  get agility() {
    return this._agility;
  }

  get speed() {
    return this._speed;
  }

  get skills() {
    return this._skills;
  }

  get weapons() {
    return this._weapons;
  }

  set id(id) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set level(level: number) {
    this._level = level;
  }

  set xp(xp: number) {
    this._xp = xp;
  }

  set hp(hp: number) {
    this._hp = hp;
  }

  set endurance(endurance: StatValue) {
    this._endurance = endurance;
  }

  set strength(strength: StatValue) {
    this._strength = strength;
  }

  set agility(agility: StatValue) {
    this._agility = agility;
  }

  set speed(speed: StatValue) {
    this._speed = speed;
  }

  set skills(skills: SkillName[]) {
    this._skills = skills;
  }

  set weapons(weapons: WeaponName[]) {
    this._weapons = weapons;
  }

  set user(user: User) {
    this._user = user;
  }

  calculateInitialStats() {
    const perk = this.getRandomBonus();

    this._skills = perk.type === 'skill' ? [perk.name as SkillName] : [];
    this._weapons = perk.type === 'weapon' ? [perk.name as WeaponName] : [];

    if (perk.type === 'skill') {
      this.applySkillModifiers(perk.name);
    }
    this.allocateStatsPoints();
    this.hp = this.calculateHP();
  }

  private getRandomBonus(): { type: 'skill' | 'weapon'; name: string } {
    return Math.random() > 0.5
      ? { type: 'skill', name: SkillNameEnum.felineAgility }
      : { type: 'weapon', name: WeaponNameEnum.sword };
  }

  private applySkillModifiers(skill: string) {
    if (skill === SkillNameEnum.felineAgility) {
      this.agility = StatValue.of(3, this.agility.modifier * 1.5);
    }
  }

  private allocateStatsPoints() {
    let availablePoints = BRUTE_STARTING_POINTS;

    const endurancePoints = randomBetween(2, 5);
    this.endurance = StatValue.of(endurancePoints, this.endurance.modifier);
    availablePoints -= endurancePoints;

    const strengthPoints = Math.min(
      randomBetween(2, 5),
      availablePoints - 2 * 2,
    );
    this.strength = StatValue.of(strengthPoints, this.strength.modifier);
    availablePoints -= strengthPoints;

    const agilityPoints = Math.min(
      randomBetween(2, 5),
      availablePoints - 2 * 1,
    );
    this.agility = StatValue.of(agilityPoints, this.agility.modifier);

    availablePoints -= agilityPoints;
    this.speed = StatValue.of(availablePoints, this.speed.modifier);
  }

  private calculateHP() {
    const baseHP = 50;
    const enduranceContribution = Math.max(this.endurance.finalValue, 0) * 6;
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
      enduranceValue: this.endurance.value,
      enduranceModifier: this.endurance.modifier,
      strengthValue: this.strength.value,
      strengthModifier: this.strength.modifier,
      agilityValue: this.agility.value,
      agilityModifier: this.agility.modifier,
      speedValue: this.speed.value,
      speedModifier: this.speed.modifier,
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
      StatValue.of(data.enduranceValue, data.enduranceModifier),
      StatValue.of(data.strengthValue, data.strengthModifier),
      StatValue.of(data.agilityValue, data.agilityModifier),
      StatValue.of(data.speedValue, data.speedModifier),
      data.skills,
      data.weapons,
    );
  }
}
