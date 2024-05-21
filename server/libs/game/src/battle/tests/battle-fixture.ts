import { Combatant } from '../domain/combatant';
import { Battle } from '../domain/battle';
import { InMemoryBattleRepository } from '../infrastructure/in-memory-battle-repository';
import { InMemoryKittenRepository } from '../../kitten/infrastructure/in-memory-kitten-repository';
import {
  CreateBattleUseCase,
  CreateBattlePresenter,
} from '../application/usecases/create-battle.usecase';
import { Kitten } from '../../kitten/domain/kitten';

export const CreateBattleFixture = () => {
  let date: Date;
  let thrownError: Error;
  const battleRepository = new InMemoryBattleRepository();
  const kittenRepository = new InMemoryKittenRepository();
  const createBattleUseCase = new CreateBattleUseCase(
    battleRepository,
    kittenRepository,
  );

  let battle: Battle;
  const createBattlePresenter: CreateBattlePresenter = {
    show(_battle: Battle) {
      battle = _battle;
    },
  };

  return {
    givenCombatantsAvailable(kittens: Kitten[]) {
      const combatants = kittens.map((kitten) => new Combatant(kitten));
      kittenRepository.givenExistingKittens(kittens);
      return combatants;
    },
    async whenBattleIsExecuted(kitten1: Kitten, kitten2: Kitten) {
      try {
        const combatants = [new Combatant(kitten1), new Combatant(kitten2)];
        await createBattleUseCase.handle({ combatants }, createBattlePresenter);
      } catch (error) {
        thrownError = error;
      }
    },
    thenErrorShouldBe(expectedErrorClass: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectedErrorClass);
    },
    thenBattleShouldBe(expectedBattle: Battle) {
      expect(battle).toEqual(expectedBattle);
    },
  };
};

export type BattleFixture = ReturnType<typeof CreateBattleFixture>;
