import { User } from '@game/game/user/domain/user';
import { Kitten } from '@game/game/kitten/domain/kitten';
import { userBuilder } from '@game/game/user/tests/user-builder';

interface KittenOptions {
  id?: number;
  name?: string;
  user?: User;
}

export const kittenBuilder = ({
  id = 1,
  name = 'brute-name',
  user = userBuilder()
    .withId(1)
    .withEmail('user@gmail.com')
    .withPassword('password')
    .build(),
}: KittenOptions = {}) => {
  const props = { id, name, user };

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
    build(): Kitten {
      return Kitten.fromData({
        id: props.id,
        name: props.name,
        user: props.user,
      });
    },
  };
};
