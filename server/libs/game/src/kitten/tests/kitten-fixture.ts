import { User } from '@game/game/user/domain/user';
import {
  CreateKittenCommand,
  CreateKittenUseCase,
} from '@game/game/kitten/application/usecases/create-kitten.usecase';
import { InMemoryUserRepository } from '@game/game/user/infrastructure/in-memory-user-repository';
import { InMemoryKittenRepository } from '@game/game/kitten/infrastructure/in-memory-kitten-repository';
import { Kitten } from '@game/game/kitten/domain/kitten';

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

      expect(kitten.user).toEqual(expectedKitten.user);
      expect(kitten.name).toEqual(expectedKitten.name);
      expect(kitten).toBeInstanceOf(Kitten);
      expect(kitten.level).toBe(1);
      expect(kitten.xp).toBe(0);
      expect(kitten.hp).toBeGreaterThan(0); // Based on endurance
      expect(kitten.enduranceStat).toBeGreaterThan(0);
      expect(kitten.strengthStat).toBeGreaterThan(0);
      expect(kitten.agilityStat).toBeGreaterThan(0);
      expect(kitten.speedStat).toBeGreaterThan(0);
      expect(kitten.weapons.length + kitten.skills.length).toBe(1);
    },
    givenUsersExists(users: User[]) {
      userRepository.givenExistingUser(users);
    },
    givenKittenExists(kittens: Kitten[]) {
      kittenRepository.givenExistingKittens(kittens);
    },
    thenErrorShouldBe(expectedErrorClass: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectedErrorClass);
    },
  };
};

export type KittenFixture = ReturnType<typeof CreateKittenFixture>;
