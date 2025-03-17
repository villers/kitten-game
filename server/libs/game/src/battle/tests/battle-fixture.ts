import { Battle } from '../domain/battle';
import { FixedRandomGenerator } from '@game/game/utils/random/random-generator';
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
    new FixedRandomGenerator(),
  );

  let battle: Battle;
  const createBattlePresenter: CreateBattlePresenter = {
    show(_battle: Battle) {
      battle = _battle;
    },
  };

  return {
    givenCombatantsAvailable(kittens: Kitten[]) {
      kittenRepository.givenExistingKittens(kittens);
    },
    async whenBattleIsExecuted(attacker: Kitten, defender: Kitten) {
      try {
        const combatants = { attacker: attacker.name, defender: defender.name };
        await createBattleUseCase.handle(combatants, createBattlePresenter);
      } catch (error) {
        thrownError = error;
      }
    },
    thenErrorShouldBe(expectedErrorClass: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectedErrorClass);
    },
    thenBattleShouldBe(expectedBattle: Battle) {
      expect(battle.id).toEqual(expectedBattle.id);
      expect(battle.combatants.length).toEqual(2);

      // Check if the combatants arrive
      const arriveCount = battle.steps.filter(
        (step) => step.action === 'arrive',
      ).length;
      expect(arriveCount).toEqual(2);

      // Check if the first combatant attacks
      const attackCount = battle.steps.filter(
        (step) => step.action === 'attack',
      ).length;
      expect(attackCount).toBeGreaterThan(0);

      // Check if death step is declared
      const deathCount = battle.steps.filter(
        (step) => step.action === 'death',
      ).length;
      expect(deathCount).toEqual(1);

      // Check if the winner is declared
      expect(battle.winner).toEqual(expectedBattle.winner);

      // Check if the looser is declared and is different from the winner and hp is 0
      expect(battle.looser).toEqual(expectedBattle.looser);
      expect(battle.looser).not.toEqual(expectedBattle.winner);
      expect(battle.looser.hp).toEqual(0);

      // Check if the end step is declared
      const endCount = battle.steps.filter(
        (step) => step.action === 'end',
      ).length;
      expect(endCount).toEqual(1);
    },
  };
};

export type BattleFixture = ReturnType<typeof CreateBattleFixture>;
