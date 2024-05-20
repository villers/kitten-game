import {
  CreateFightFixture,
  FightFixture,
} from '@game/game/fight/tests/fight-fixture';
import { kittenBuilder } from '@game/game/kitten/tests/kitten-builder';
import { fightBuilder } from '@game/game/fight/tests/fight-builder';
import { KittenNotFoundError } from '@game/game/kitten/domain/error';
import { skills } from '@game/game/kitten/domain/skill';
import { FightWithSameKittenError } from '@game/game/fight/domain/error';

describe('Feature: Combat Execution', () => {
  let fixture: FightFixture;

  beforeEach(() => {
    fixture = CreateFightFixture();
  });

  describe('Combat Execution Rules', () => {
    test('executes a combat with valid fighters', async () => {
      const kitten1 = kittenBuilder().withId(1).withName('fighter').build();
      const Kitten2 = kittenBuilder().withId(2).withName('opponents').build();

      fixture.givenFightersAvailable([kitten1, Kitten2]);

      await fixture.whenCombatIsExecuted(kitten1, Kitten2);

      fixture.thenCombatShouldBeExecuted(
        fightBuilder().withAttacker(kitten1).withDefender(Kitten2).build(),
      );
    });

    test('executes a combat with valid fighters with many hp', async () => {
      const kitten1 = kittenBuilder()
        .withId(1)
        .withName('fighter')
        .withHp(1000)
        .withSkills(skills.filter((skill) => skill.name === 'felineAgility'))
        .build();
      const Kitten2 = kittenBuilder()
        .withId(2)
        .withName('opponents')
        .withHp(100)
        .build();

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
