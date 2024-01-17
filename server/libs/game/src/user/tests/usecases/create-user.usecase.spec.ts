import { userBuilder } from '@game/game/user/tests/user-builder';
import {
  UserFixture,
  CreateUserFixture,
} from '@game/game/user/tests/user-fixture';
import {
  UserEmailAlreadyInUseError,
  UserEmailRequiredError,
  UserInvalidEmailFormatError,
  UserPasswordRequiredError,
  UserPasswordTooShortError,
} from '@game/game/user/domain/user';

describe('Feature: User Creation', () => {
  let fixture: UserFixture;

  beforeEach(() => {
    fixture = CreateUserFixture();
  });

  describe('User Creation Validations', () => {
    test('creates a user with valid credentials', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenUserIsCreate({
        id: 1,
        email: 'user@gmail.com',
        password: 'password',
      });

      await fixture.thenUserShouldBe(
        userBuilder()
          .withId(1)
          .withEmail('user@gmail.com')
          .withPassword('password')
          .build(),
      );
    });

    test('fails when email is missing', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenUserIsCreate({
        id: 1,
        email: '',
        password: 'password',
      });

      fixture.thenErrorShouldBe(UserEmailRequiredError);
    });

    test('fails with invalid email format', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenUserIsCreate({
        id: 1,
        email: 'bademail',
        password: 'password',
      });

      fixture.thenErrorShouldBe(UserInvalidEmailFormatError);
    });

    test('fails when email is already in use', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      const user = userBuilder().withEmail('email@gmail.com');
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsCreate({
        id: 1,
        email: 'email@gmail.com',
        password: 'password',
      });

      fixture.thenErrorShouldBe(UserEmailAlreadyInUseError);
    });

    test('fails when password is missing', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenUserIsCreate({
        id: 1,
        email: 'user@gmail.com',
        password: '',
      });

      fixture.thenErrorShouldBe(UserPasswordRequiredError);
    });

    test('fails with password shorter than 6 characters', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenUserIsCreate({
        id: 1,
        email: 'user@gmail.com',
        password: '12345',
      });

      fixture.thenErrorShouldBe(UserPasswordTooShortError);
    });
  });
});
