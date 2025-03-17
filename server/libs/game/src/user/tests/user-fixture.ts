import {
  CreateUserCommand,
  CreateUserUseCase,
} from '@game/game/user/application/usecases/create-user.usecase';
import { User } from '@game/game/user/domain/user';
import { InMemoryUserRepository } from '@game/game/user/infrastructure/in-memory-user-repository';
import {
  UpdateUserCommand,
  UpdateUserUseCase,
} from '@game/game/user/application/usecases/update-user.usecase';

export const CreateUserFixture = () => {
  let date: Date;
  let thrownError: Error;

  const userRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  return {
    givenDateIs(_date: Date) {
      date = _date;
    },
    async whenUserIsCreate(createUserCommand: CreateUserCommand) {
      try {
        await createUserUseCase.handle(createUserCommand);
      } catch (err) {
        thrownError = err;
      }
    },
    async whenUserIsUpdated(updateUserCommand: UpdateUserCommand) {
      try {
        await updateUserUseCase.handle(updateUserCommand);
      } catch (err) {
        thrownError = err;
      }
    },
    async thenUserShouldBe(expectedUser: User) {
      const user = await userRepository.findById(expectedUser.id);
      expect(user).toEqual(expectedUser);
    },
    givenUsersExists(users: User[]) {
      userRepository.givenExistingUser(users);
    },
    thenErrorShouldBe(expectedErrorClass: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectedErrorClass);
    },
  };
};

export type UserFixture = ReturnType<typeof CreateUserFixture>;
