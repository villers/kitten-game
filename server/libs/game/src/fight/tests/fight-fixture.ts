import { Kitten } from '@game/game/kitten/domain/kitten';
import { Fight } from '@game/game/fight/domain/fight';
import {
  CreateFightPresenter,
  CreateFightUsecase,
} from '@game/game/fight/application/usecases/create-fight.usecase';
import { InMemoryFightRepository } from '@game/game/fight/infrastructure/in-memory-kitten-repository';
import { InMemoryKittenRepository } from '@game/game/kitten/infrastructure/in-memory-kitten-repository';

export const CreateFightFixture = () => {
  let date: Date;
  let thrownError: Error;
  const fightRepository = new InMemoryFightRepository();
  const kittenRepository = new InMemoryKittenRepository();
  const createFightUsecase = new CreateFightUsecase(
    fightRepository,
    kittenRepository,
  );

  let fight: Fight;
  const createFightPresenter: CreateFightPresenter = {
    show(_fight: Fight) {
      fight = _fight;
    },
  };

  return {
    givenFightersAvailable(kittens: Kitten[]) {
      kittenRepository.givenExistingKittens(kittens);
    },
    async whenCombatIsExecuted(kitten1: Kitten, kitten2: Kitten) {
      try {
        await createFightUsecase.handle(
          { kitten1, kitten2 },
          createFightPresenter,
        );
      } catch (error) {
        thrownError = error;
      }
    },
    thenErrorShouldBe(expectedErrorClass: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectedErrorClass);
    },
    thenCombatShouldBeExecuted(expectedFight: Fight) {
      expect(fight).toEqual(expectedFight);
    },
  };
};

export type FightFixture = ReturnType<typeof CreateFightFixture>;
