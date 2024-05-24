import { User } from '@game/game/user/domain/user';
import { StatValue } from '@game/game/kitten/domain/stat-value';
import { Skill, SkillNameEnum, skills } from '@game/game/kitten/domain/skill';
import {
  Weapon,
  WeaponNameEnum,
  weapons,
} from '@game/game/kitten/domain/weapon';
import {
  DefaultRandomGenerator,
  RandomGenerator,
} from '@game/game/utils/random/random-generator';

export const BASE_FIGHTER_STATS = {
  reversal: 0,
  evasion: 0.1,
  swiftness: 0.2,
  block: -0.25,
  accuracy: 0,
  disarm: 0.05,
  combo: 0,
  tempo: 1.2,
} as const;

export type FighterStat = keyof typeof BASE_FIGHTER_STATS;

export const BRUTE_STARTING_POINTS = 11;

export class Kitten {
  private _hp: number;

  constructor(
    private _id: number,
    private _name: string,
    private _user: User,
    private _level: number = 1,
    private _xp: number = 0,
    private _initiative: number = 1,
    private _endurance: StatValue = StatValue.of(0),
    private _strength: StatValue = StatValue.of(0),
    private _agility: StatValue = StatValue.of(0),
    private _speed: StatValue = StatValue.of(0),
    private _skills: Skill[] = [],
    private _weapons: Weapon[] = [],
    private _activeSkills: Skill[] = [],
    private _activeWeapon: Weapon | null = null,
    private randomGenerator: RandomGenerator = new DefaultRandomGenerator(),
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

  get initiative() {
    return this._initiative;
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

  get activeSkills() {
    return this._activeSkills;
  }

  get weapons() {
    return this._weapons;
  }

  get activeWeapon() {
    return this._activeWeapon;
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

  set initiative(initiative: number) {
    this._initiative = initiative;
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

  set skills(skills: Skill[]) {
    this._skills = skills;
  }

  set activeSkills(activeSkills: Skill[]) {
    this._activeSkills = activeSkills;
  }

  set weapons(weapons: Weapon[]) {
    this._weapons = weapons;
  }

  set activeWeapon(activeWeapon: Weapon | null) {
    this._activeWeapon = activeWeapon;
  }

  set user(user: User) {
    this._user = user;
  }

  calculateInitialStats() {
    const perk = this.getRandomBonus();

    this._skills =
      perk.type === 'skill' ? [skills[perk.name as SkillNameEnum]] : [];
    this._weapons =
      perk.type === 'weapon' ? [weapons[perk.name as WeaponNameEnum]] : [];

    if (perk.type === 'skill') {
      this.applySkillModifiers(perk.name as SkillNameEnum);
    }
    this.allocateStatsPoints();
    this.calculateHP();
  }

  private getRandomBonus(): { type: 'skill' | 'weapon'; name: string } {
    return this.randomGenerator.generateRandomBoolean()
      ? {
          type: 'skill',
          name: this.randomGenerator.getRandomKeyFromObject(SkillNameEnum),
        }
      : {
          type: 'weapon',
          name: this.randomGenerator.getRandomKeyFromObject(WeaponNameEnum),
        };
  }

  private allocateStatsPoints() {
    let availablePoints = BRUTE_STARTING_POINTS;

    const endurancePoints = this.randomGenerator.between(2, 5);
    this.endurance = StatValue.of(endurancePoints, this.endurance.modifier);
    availablePoints -= endurancePoints;

    const strengthPoints = Math.min(
      this.randomGenerator.between(2, 5),
      availablePoints - 2 * 2,
    );
    this.strength = StatValue.of(strengthPoints, this.strength.modifier);
    availablePoints -= strengthPoints;

    const agilityPoints = Math.min(
      this.randomGenerator.between(2, 5),
      availablePoints - 2 * 1,
    );
    this.agility = StatValue.of(agilityPoints, this.agility.modifier);

    availablePoints -= agilityPoints;
    this.speed = StatValue.of(availablePoints, this.speed.modifier);
  }

  private applySkillModifiers(skill: SkillNameEnum) {
    if (skill === SkillNameEnum.felineAgility) {
      this.agility = StatValue.of(3, this.agility.modifier * 1.5);
    }
  }

  public calculateHP() {
    const baseHP = 50;
    const enduranceContribution = Math.max(this.endurance.finalValue, 0) * 6;
    const levelContribution = this.level * 0.25 * 6;
    this._hp = Math.floor(baseHP + enduranceContribution + levelContribution);
  }

  public increaseInitiative() {
    const random = this.randomGenerator.between(0, 10);
    this.initiative +=
      this.initiative * BASE_FIGHTER_STATS.tempo + random / 100;
  }

  public isAlive() {
    return this.hp > 0;
  }

  public isDead() {
    return !this.isAlive();
  }

  public attack(defender: Kitten): number {
    const damage = this.randomGenerator.between(1, this.strength.finalValue);
    defender.hp -= damage;

    return damage;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      user: this.user,
      level: this.level,
      xp: this.xp,
      hp: this.hp,
      initiative: this.initiative,
      enduranceValue: this.endurance.value,
      enduranceModifier: this.endurance.modifier,
      strengthValue: this.strength.value,
      strengthModifier: this.strength.modifier,
      agilityValue: this.agility.value,
      agilityModifier: this.agility.modifier,
      speedValue: this.speed.value,
      speedModifier: this.speed.modifier,
      skills: this.skills,
      activeSkills: this.activeSkills,
      weapons: this.weapons,
      activeWeapon: this.activeWeapon,
    };
  }

  static fromData(
    data: Omit<Kitten['data'], 'hp'>,
    randomGenerator: RandomGenerator = new DefaultRandomGenerator(),
  ) {
    return new Kitten(
      data.id,
      data.name,
      User.fromData(data.user),
      data.level,
      data.xp,
      data.initiative,
      StatValue.of(data.enduranceValue, data.enduranceModifier),
      StatValue.of(data.strengthValue, data.strengthModifier),
      StatValue.of(data.agilityValue, data.agilityModifier),
      StatValue.of(data.speedValue, data.speedModifier),
      data.skills,
      data.weapons,
      data.activeSkills,
      data.activeWeapon,
      randomGenerator,
    );
  }
}
