import { User } from '@game/game/user/domain/user';
import { Kitten, SkillName, WeaponName } from '@game/game/kitten/domain/kitten';
import { userBuilder } from '@game/game/user/tests/user-builder';

interface KittenOptions {
  id?: number;
  name?: string;
  user?: User;
  level?: number;
  xp?: number;
  hp?: number;
  enduranceStat?: number;
  enduranceModifier?: number;
  enduranceValue?: number;
  strengthStat?: number;
  strengthModifier?: number;
  strengthValue?: number;
  agilityStat?: number;
  agilityModifier?: number;
  agilityValue?: number;
  speedStat?: number;
  speedModifier?: number;
  speedValue?: number;
  skills?: SkillName[];
  weapons?: WeaponName[];
}

export const kittenBuilder = ({
  id = 1,
  name = 'kitten-name',
  user = userBuilder()
    .withId(1)
    .withEmail('user@gmail.com')
    .withPassword('password')
    .build(),
  level = 1,
  xp = 0,
  hp = 0,
  enduranceStat = 0,
  enduranceModifier = 1,
  enduranceValue = 0,
  strengthStat = 0,
  strengthModifier = 1,
  strengthValue = 0,
  agilityStat = 0,
  agilityModifier = 1,
  agilityValue = 0,
  speedStat = 0,
  speedModifier = 1,
  speedValue = 0,
  weapons = [],
  skills = [],
}: KittenOptions = {}) => {
  const props = {
    id,
    name,
    user,
    level,
    xp,
    hp,
    enduranceStat,
    enduranceModifier,
    enduranceValue,
    strengthStat,
    strengthModifier,
    strengthValue,
    agilityStat,
    agilityModifier,
    agilityValue,
    speedStat,
    speedModifier,
    speedValue,
    skills,
    weapons,
  };

  return {
    withId(_id: number) {
      return kittenBuilder({
        ...props,
        id: _id,
      });
    },
    withName(_name: string) {
      return kittenBuilder({
        ...props,
        name: _name,
      });
    },
    withUser(_user: User) {
      return kittenBuilder({
        ...props,
        user: _user,
      });
    },
    withLevel(_level: number) {
      return kittenBuilder({
        ...props,
        level: _level,
      });
    },
    withXp(_xp: number) {
      return kittenBuilder({
        ...props,
        xp: _xp,
      });
    },
    withHp(_hp: number) {
      return kittenBuilder({
        ...props,
        hp: _hp,
      });
    },
    withEnduranceStat(_enduranceStat: number) {
      return kittenBuilder({
        ...props,
        enduranceStat: _enduranceStat,
      });
    },
    withEnduranceModifier(_enduranceModifier: number) {
      return kittenBuilder({
        ...props,
        enduranceModifier: _enduranceModifier,
      });
    },
    withEnduranceValue(_enduranceValue: number) {
      return kittenBuilder({
        ...props,
        enduranceValue: _enduranceValue,
      });
    },
    withStrengthStat(_strengthStat: number) {
      return kittenBuilder({
        ...props,
        strengthStat: _strengthStat,
      });
    },
    withStrengthModifier(_strengthModifier: number) {
      return kittenBuilder({
        ...props,
        strengthModifier: _strengthModifier,
      });
    },
    withStrengthValue(_strengthValue: number) {
      return kittenBuilder({
        ...props,
        strengthValue: _strengthValue,
      });
    },
    withAgilityStat(_agilityStat: number) {
      return kittenBuilder({
        ...props,
        agilityStat: _agilityStat,
      });
    },
    withAgilityModifier(_agilityModifier: number) {
      return kittenBuilder({
        ...props,
        agilityModifier: _agilityModifier,
      });
    },
    withAgilityValue(_agilityValue: number) {
      return kittenBuilder({
        ...props,
        agilityValue: _agilityValue,
      });
    },
    withSpeedStat(_speedStat: number) {
      return kittenBuilder({
        ...props,
        speedStat: _speedStat,
      });
    },
    withSpeedModifier(_speedModifier: number) {
      return kittenBuilder({
        ...props,
        speedModifier: _speedModifier,
      });
    },
    withSpeedValue(_speedValue: number) {
      return kittenBuilder({
        ...props,
        speedValue: _speedValue,
      });
    },
    withSkills(_skills: SkillName[]) {
      return kittenBuilder({
        ...props,
        skills: _skills,
      });
    },
    withWeapons(_weapons: WeaponName[]) {
      return kittenBuilder({
        ...props,
        weapons: _weapons,
      });
    },

    build(): Kitten {
      return Kitten.fromData({
        id: props.id,
        name: props.name,
        user: props.user,
        level: props.level,
        xp: props.xp,
        hp: props.hp,
        enduranceStat: props.enduranceStat,
        enduranceModifier: props.enduranceModifier,
        enduranceValue: props.enduranceValue,
        strengthStat: props.strengthStat,
        strengthModifier: props.strengthModifier,
        strengthValue: props.strengthValue,
        agilityStat: props.agilityStat,
        agilityModifier: props.agilityModifier,
        agilityValue: props.agilityValue,
        speedStat: props.speedStat,
        speedModifier: props.speedModifier,
        speedValue: props.speedValue,
        skills: props.skills,
        weapons: props.weapons,
      });
    },
  };
};
