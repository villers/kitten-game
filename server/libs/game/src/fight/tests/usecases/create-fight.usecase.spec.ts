import {
  CreateFightFixture,
  FightFixture,
} from '@game/game/fight/tests/fight-fixture';
import { kittenBuilder } from '@game/game/kitten/tests/kitten-builder';
import { fightBuilder } from '@game/game/fight/tests/fight-builder';
import { KittenNotFoundError } from '@game/game/kitten/domain/kitten';
import { FightWithSameKittenError } from '@game/game/fight/domain/fight';

describe('Feature: Combat Execution', () => {
  let fixture: FightFixture;

  beforeEach(() => {
    fixture = CreateFightFixture();
  });

  describe('Combat Execution Rules', () => {
    test('executes a combat with valid fighters', async () => {
      const kitten1 = kittenBuilder().withId(1).build();
      const Kitten2 = kittenBuilder().withId(2).build();

      fixture.givenFightersAvailable([kitten1, Kitten2]);

      await fixture.whenCombatIsExecuted(kitten1, Kitten2);

      fixture.thenCombatShouldBeExecuted(
        fightBuilder().withAttacker(kitten1).withDefender(Kitten2).build(),
      );
    });
  });

  test('fails to execute a combat with invalid kitten1', async () => {
    const kitten1 = kittenBuilder().withId(1).build();
    const Kitten2 = kittenBuilder().withId(2).build();

    fixture.givenFightersAvailable([kitten1]);

    await fixture.whenCombatIsExecuted(kitten1, Kitten2);

    fixture.thenErrorShouldBe(KittenNotFoundError);
  });

  test('fails to execute a combat with invalid kitten2', async () => {
    const kitten1 = kittenBuilder().withId(1).build();
    const Kitten2 = kittenBuilder().withId(2).build();

    fixture.givenFightersAvailable([Kitten2]);

    await fixture.whenCombatIsExecuted(kitten1, Kitten2);

    fixture.thenErrorShouldBe(KittenNotFoundError);
  });

  test('fails to execute a combat if kitten1 is kitten2', async () => {
    const kitten1 = kittenBuilder().withId(1).build();

    fixture.givenFightersAvailable([kitten1, kitten1]);

    await fixture.whenCombatIsExecuted(kitten1, kitten1);

    fixture.thenErrorShouldBe(FightWithSameKittenError);
  });
});
