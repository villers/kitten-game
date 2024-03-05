import { User } from '@game/game/user/domain/user';
import { Kitten, SkillName, WeaponName } from '@game/game/kitten/domain/kitten';
import { userBuilder } from '@game/game/user/tests/user-builder';
import { StatValue } from '@game/game/kitten/domain/stats-value';

interface KittenOptions {
  id?: number;
  name?: string;
  user?: User;
  level?: number;
  xp?: number;
  hp?: number;
  endurance?: StatValue;
  strength?: StatValue;
  agility?: StatValue;
  speed?: StatValue;
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
  endurance = StatValue.of(0, 1),
  strength = StatValue.of(0, 1),
  agility = StatValue.of(0, 1),
  speed = StatValue.of(0, 1),
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
    endurance,
    strength,
    agility,
    speed,
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
    withEndurance(_endurance: StatValue) {
      return kittenBuilder({
        ...props,
        endurance: _endurance,
      });
    },
    withStrength(_strength: StatValue) {
      return kittenBuilder({
        ...props,
        strength: _strength,
      });
    },
    withAgility(_agility: StatValue) {
      return kittenBuilder({
        ...props,
        agility: _agility,
      });
    },
    withSpeed(_speed: StatValue) {
      return kittenBuilder({
        ...props,
        speed: _speed,
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
        enduranceValue: props.endurance.value,
        enduranceModifier: props.endurance.modifier,
        strengthValue: props.strength.value,
        strengthModifier: props.strength.modifier,
        agilityValue: props.agility.value,
        agilityModifier: props.agility.modifier,
        speedValue: props.agility.value,
        speedModifier: props.agility.modifier,
        skills: props.skills,
        weapons: props.weapons,
      });
    },
  };
};
