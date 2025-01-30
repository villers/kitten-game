import { User } from '@game/game/user/domain/user';
import {
  DefaultRandomGenerator,
  RandomGenerator,
} from '@game/game/utils/random/random-generator';
import { KittenAttributes } from './kitten-attributes';
import { KittenStatus } from './kitten-status';
import { KittenEquipment } from './kitten-equipment';
import { SkillAction } from './skill-action';

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

export const BRUTE_STARTING_POINTS = 11;

export class Kitten {
  constructor(
    private _id: number,
    private _name: string,
    private _user: User,
    private _level: number = 1,
    private _xp: number = 0,
    private _attributes: KittenAttributes,
    private _status: KittenStatus = new KittenStatus(),
    private _skills: SkillAction[],
    private _equipment: KittenEquipment = new KittenEquipment(),
    private _initiative: number = 1,
    private randomGenerator: RandomGenerator = new DefaultRandomGenerator(),
  ) {}

  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
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
    return this._attributes.hp;
  }

  get initiative() {
    return this._initiative;
  }

  get attributes() {
    return this._attributes;
  }

  get status() {
    return this._status;
  }

  get equipment() {
    return this._equipment;
  }

  get skills() {
    return this._skills;
  }

  calculateInitialStats() {
    this.allocateStatsPoints();
    this._attributes.calculateHP(this._level);
  }

  private allocateStatsPoints() {
    let availablePoints = BRUTE_STARTING_POINTS;

    const endurancePoints = this.randomGenerator.between(2, 5);
    this._attributes.increaseStat('endurance', endurancePoints);
    availablePoints -= endurancePoints;

    const strengthPoints = Math.min(
      this.randomGenerator.between(2, 5),
      availablePoints - 2 * 2,
    );
    this._attributes.increaseStat('strength', strengthPoints);
    availablePoints -= strengthPoints;

    const agilityPoints = Math.min(
      this.randomGenerator.between(2, 5),
      availablePoints - 2 * 1,
    );
    this._attributes.increaseStat('agility', agilityPoints);

    availablePoints -= agilityPoints;
    this._attributes.increaseStat('speed', availablePoints);
  }

  public increaseInitiative() {
    const random = this.randomGenerator.between(0, 10);
    this._initiative +=
      this._initiative * BASE_FIGHTER_STATS.tempo + random / 100;
  }

  public isAlive() {
    return this._attributes.isAlive();
  }

  public attack(defender: Kitten): number {
    const damage = this.randomGenerator.between(
      1,
      this._attributes.strength.finalValue,
    );
    defender._attributes.takeDamage(damage);

    return damage;
  }

  public useSkill(skill: SkillAction, target: Kitten) {
    if (!skill.isOnCooldown()) {
      skill.use(this, target);
    }
  }

  public reduceSkillCooldowns() {
    this._skills.forEach((skill) => skill.reduceCooldown());
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
      skills: this.skills,
      status: this.status,
      equipment: this.equipment,
      attributes: this.attributes,
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
      data.attributes,
      data.status,
      data.skills,
      data.equipment,
      data.initiative,
      randomGenerator,
    );
  }
}
