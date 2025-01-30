import { User } from '@game/game/user/domain/user';
import { Kitten } from '@game/game/kitten/domain/kitten';
import { userBuilder } from '@game/game/user/tests/user-builder';
import { StatValue } from '@game/game/kitten/domain/stat-value';
import { FixedRandomGenerator } from '@game/game/utils/random/random-generator';
import { SkillAction } from '@game/game/kitten/domain/skill-action';
import { KittenEquipment } from '@game/game/kitten/domain/kitten-equipment';
import { KittenAttributes } from '@game/game/kitten/domain/kitten-attributes';
import { KittenStatus } from '@game/game/kitten/domain/kitten-status';

interface KittenOptions {
  id?: number;
  name?: string;
  user?: User;
  level?: number;
  xp?: number;
  initiative?: number;
  status?: KittenStatus;
  attributes?: KittenAttributes;
  skills?: SkillAction[];
  equipment?: KittenEquipment;
  seed?: number;
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
  initiative = 1,
  attributes = new KittenAttributes(
    0, // hp, will be calculated
    0, // maxHp, will be calculated
    StatValue.of(1), // endurance
    StatValue.of(1), // strength
    StatValue.of(1), // agility
    StatValue.of(1), // speed
  ),
  status = new KittenStatus(),
  skills = [],
  equipment = new KittenEquipment(),
  seed = 1,
}: KittenOptions = {}) => {
  const props = {
    id,
    name,
    user,
    level,
    xp,
    initiative,
    attributes,
    status,
    skills,
    equipment,
    seed,
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
    withInitiative(_initiative: number) {
      return kittenBuilder({
        ...props,
        initiative: _initiative,
      });
    },
    withAttributes(_attributes: KittenAttributes) {
      return kittenBuilder({
        ...props,
        attributes: _attributes,
      });
    },
    withStatus(_status: KittenStatus) {
      return kittenBuilder({
        ...props,
        status: _status,
      });
    },
    withSkills(_skills: SkillAction[]) {
      return kittenBuilder({
        ...props,
        skills: _skills,
      });
    },
    withEquipment(_equipment: KittenEquipment) {
      return kittenBuilder({
        ...props,
        equipment: _equipment,
      });
    },
    withSeed(_seed: number) {
      return kittenBuilder({
        ...props,
        seed: _seed,
      });
    },
    build(): Kitten {
      const randomGenerator = new FixedRandomGenerator(props.seed);
      const kitten = Kitten.fromData(
        {
          id: props.id,
          name: props.name,
          user: props.user,
          level: props.level,
          xp: props.xp,
          initiative: props.initiative,
          attributes: props.attributes,
          status: props.status,
          equipment: props.equipment,
          skills: props.skills,
        },
        randomGenerator,
      );
      kitten.attributes.calculateHP(props.level);
      return kitten;
    },
  };
};
