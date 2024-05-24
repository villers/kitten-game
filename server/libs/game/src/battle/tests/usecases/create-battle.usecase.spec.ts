import { CreateBattleFixture, BattleFixture } from '../battle-fixture';
import { kittenBuilder } from '../../../kitten/tests/kitten-builder';
import { battleBuilder } from '../battle-builder';
import { KittenNotFoundError } from '@game/game/kitten/domain/errors';
import { BattleWithSameKittenError } from '@game/game/battle/domain/errors';

describe('Feature: Battle Execution', () => {
  let fixture: BattleFixture;

  beforeEach(() => {
    fixture = CreateBattleFixture();
  });

  describe('Battle Execution Rules', () => {
    test('executes a battle with valid fighters', async () => {
      const winner = kittenBuilder()
        .withId(1)
        .withName('winner')
        .withLevel(10)
        .build();
      const looser = kittenBuilder()
        .withId(2)
        .withName('looser')
        .withLevel(1)
        .build();

      fixture.givenCombatantsAvailable([winner, looser]);

      await fixture.whenBattleIsExecuted(winner, looser);

      fixture.thenBattleShouldBe(
        battleBuilder()
          .withCombatants([winner, looser])
          .withWinner(winner)
          .withLooser(looser)
          .build(),
      );
    });

    test('fails to execute a battle with invalid fighter', async () => {
      const fighter = kittenBuilder().withId(1).withName('fighter').build();
      const opponent = kittenBuilder().withId(2).withName('opponent').build();

      fixture.givenCombatantsAvailable([opponent]);

      await fixture.whenBattleIsExecuted(fighter, opponent);

      fixture.thenErrorShouldBe(KittenNotFoundError);
    });

    test('fails to execute a battle with invalid opponent', async () => {
      const fighter = kittenBuilder().withId(1).withName('fighter').build();
      const opponent = kittenBuilder().withId(2).withName('opponent').build();

      fixture.givenCombatantsAvailable([fighter]);

      await fixture.whenBattleIsExecuted(fighter, opponent);

      fixture.thenErrorShouldBe(KittenNotFoundError);
    });

    test('fails to execute a battle if fighter is opponent', async () => {
      const fighter = kittenBuilder().withId(1).withName('fighter').build();

      fixture.givenCombatantsAvailable([fighter, fighter]);

      await fixture.whenBattleIsExecuted(fighter, fighter);

      fixture.thenErrorShouldBe(BattleWithSameKittenError);
    });
  });
});
