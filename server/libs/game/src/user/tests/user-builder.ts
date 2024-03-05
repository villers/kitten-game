import { User } from '@game/game/user/domain/user';

interface UserOptions {
  id?: number;
  email?: string;
  password?: string;
}

export const userBuilder = ({
  id = 1,
  email = 'user@gmail.com',
  password = 'password',
}: UserOptions = {}) => {
  const props = { id, email, password };

  return {
    withId(_id: number) {
      return userBuilder({
        ...props,
        id: _id,
      });
    },
    withEmail(_email: string) {
      return userBuilder({
        ...props,
        email: _email,
      });
    },
    withPassword(_password: string) {
      return userBuilder({
        ...props,
        password: _password,
      });
    },
    build(): User {
      return User.fromData({
        id: props.id,
        email: props.email,
        password: props.password,
      });
    },
  };
};
