import { userBuilder } from '@game/game/user/tests/user-builder';
import {
  CreateUserFixture,
  UserFixture,
} from '@game/game/user/tests/user-fixture';
import {
  UserEmailAlreadyInUseError,
  UserEmailRequiredError,
  UserInvalidEmailFormatError,
  UserPasswordRequiredError,
  UserPasswordTooShortError,
} from '@game/game/user/domain/error';

describe('Feature: User Update', () => {
  let fixture: UserFixture;

  beforeEach(() => {
    fixture = CreateUserFixture();
  });

  describe('User Update Validations', () => {
    const user = userBuilder()
      .withId(1)
      .withEmail('user@gmail.com')
      .withPassword('password');

    test('updates user with valid details', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: 'user2@gmail.com',
        password: 'password2',
      });

      await fixture.thenUserShouldBe(
        user.withEmail('user2@gmail.com').withPassword('password2').build(),
      );
    });

    test('fails when email is missing', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: '',
        password: 'password',
      });

      fixture.thenErrorShouldBe(UserEmailRequiredError);
    });

    test('fails with invalid email format', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: 'bademail',
        password: 'password',
      });

      fixture.thenErrorShouldBe(UserInvalidEmailFormatError);
    });

    test('fails when email is already in use', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([
        user.build(),
        user.withId(2).withEmail('user2@gmail.com').build(),
      ]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: 'user2@gmail.com',
        password: 'password',
      });

      fixture.thenErrorShouldBe(UserEmailAlreadyInUseError);
    });

    test('fails when password is missing', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: 'user@gmail.com',
        password: '',
      });

      fixture.thenErrorShouldBe(UserPasswordRequiredError);
    });

    test('fails with password shorter than 6 characters', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: 'user@gmail.com',
        password: '12345',
      });

      fixture.thenErrorShouldBe(UserPasswordTooShortError);
    });
  });
});
