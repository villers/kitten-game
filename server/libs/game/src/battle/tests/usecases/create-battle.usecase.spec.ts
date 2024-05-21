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
      const kitten1 = kittenBuilder().withId(1).withName('fighter').build();
      const kitten2 = kittenBuilder().withId(2).withName('opponent').build();

      const combatants = fixture.givenCombatantsAvailable([kitten1, kitten2]);

      await fixture.whenBattleIsExecuted(kitten1, kitten2);

      fixture.thenBattleShouldBe(
        battleBuilder().withCombatants(combatants).build(),
      );
    });

    test('fails to execute a battle with invalid kitten1', async () => {
      const kitten1 = kittenBuilder().withId(1).build();
      const kitten2 = kittenBuilder().withId(2).build();

      fixture.givenCombatantsAvailable([kitten2]);

      await fixture.whenBattleIsExecuted(kitten1, kitten2);

      fixture.thenErrorShouldBe(KittenNotFoundError);
    });

    test('fails to execute a battle avec invalid kitten2', async () => {
      const kitten1 = kittenBuilder().withId(1).build();
      const kitten2 = kittenBuilder().withId(2).build();

      fixture.givenCombatantsAvailable([kitten1]);

      await fixture.whenBattleIsExecuted(kitten1, kitten2);

      fixture.thenErrorShouldBe(KittenNotFoundError);
    });

    test('fails to execute a battle if kitten1 is kitten2', async () => {
      const kitten1 = kittenBuilder().withId(1).build();

      fixture.givenCombatantsAvailable([kitten1, kitten1]);

      await fixture.whenBattleIsExecuted(kitten1, kitten1);

      fixture.thenErrorShouldBe(BattleWithSameKittenError);
    });
  });
});
