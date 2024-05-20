import {
  CreateKittenFixture,
  KittenFixture,
} from '@game/game/kitten/tests/kitten-fixture';
import { userBuilder } from '@game/game/user/tests/user-builder';
import { kittenBuilder } from '@game/game/kitten/tests/kitten-builder';
import {
  UserNotFoundForKittenCreationError,
  KittenNameAlreadyExistError,
} from '@game/game/kitten/domain/error';

describe('Feature: Kitten Creation', () => {
  let fixture: KittenFixture;

  beforeEach(() => {
    fixture = CreateKittenFixture();
  });

  describe('Kitten Creation Rules', () => {
    test('creates a kitten with valid details', async () => {
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

    test('fails when user does not exist', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenKittenIsCreate({
        name: 'kitten-name',
        user: 1,
      });

      fixture.thenErrorShouldBe(UserNotFoundForKittenCreationError);
    });

    test('fails if kitten name already exists', async () => {
      const user = userBuilder()
        .withId(1)
        .withEmail('user@gmail.com')
        .withPassword('password')
        .build();

      const kitten = kittenBuilder()
        .withId(1)
        .withName('kitten-name')
        .withUser(user)
        .build();

      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user]);
      fixture.givenKittenExists([kitten]);

      await fixture.whenKittenIsCreate({
        name: 'kitten-name',
        user: 1,
      });

      fixture.thenErrorShouldBe(KittenNameAlreadyExistError);
    });
  });
});
