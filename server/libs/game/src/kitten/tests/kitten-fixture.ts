import { User } from '@game/game/user/domain/user';
import {
  CreateKittenCommand,
  CreateKittenUseCase,
} from '@game/game/kitten/application/usecases/create-kitten.usecase';
import { InMemoryUserRepository } from '@game/game/user/infrastructure/in-memory-user-repository';
import { InMemoryKittenRepository } from '@game/game/kitten/infrastructure/in-memory-kitten-repository';

export const CreateKittenFixture = () => {
  let date: Date;
  let thrownError: Error;

  const kittenRepository = new InMemoryKittenRepository();
  const userRepository = new InMemoryUserRepository();
  const createKittenUseCase = new CreateKittenUseCase(
    kittenRepository,
    userRepository,
  );

  return {
    givenDateIs(_date: Date) {
      date = _date;
    },
    async whenKittenIsCreate(createKittenCommand: CreateKittenCommand) {
      try {
        await createKittenUseCase.handle(createKittenCommand);
      } catch (err) {
        thrownError = err;
      }
    },
    async thenKittenShouldBe(expectedKitten: any) {
      const kitten = await kittenRepository.findById(expectedKitten.id);
      expect(kitten).toEqual(expectedKitten);
    },
    givenUsersExists(users: User[]) {
      userRepository.givenExistingUser(users);
    },
    thenErrorShouldBe(expectedErrorClass: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectedErrorClass);
    },
  };
};

export type KittenFixture = ReturnType<typeof CreateKittenFixture>;
