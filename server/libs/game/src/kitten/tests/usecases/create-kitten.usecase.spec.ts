import {
  CreateKittenFixture,
  KittenFixture,
} from '@game/game/kitten/tests/kitten-fixture';
import { userBuilder } from '@game/game/user/tests/user-builder';
import { kittenBuilder } from '@game/game/kitten/tests/kitten-builder';

describe('Feature: Create a Kitten', () => {
  let fixture: KittenFixture;

  beforeEach(() => {
    fixture = CreateKittenFixture();
  });

  describe('Rule: A Kitten can be created', () => {
    test('With all required input', async () => {
      const user = userBuilder()
        .withId(1)
        .withEmail('user@gmail.com')
        .withPassword('password')
        .build();

      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user]);

      await fixture.whenKittenIsCreate({
        name: 'kitten-name',
        user: 1,
      });

      await fixture.thenKittenShouldBe(
        kittenBuilder()
          .withId(1)
          .withName('kitten-name')
          .withUser(user)
          .build(),
      );
    });
  });
});
