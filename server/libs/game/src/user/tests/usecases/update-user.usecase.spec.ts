import { userBuilder } from '@game/game/user/tests/user-builder';
import {
  CreateUserFixture,
  UserFixture,
} from '@game/game/user/tests/user-fixture';
import {
  DuplicateEmailError,
  InvalidEmailError,
  PasswordCannotBeEmptyError,
  PasswordMustBeAtLeast6CharactersError,
} from '@game/game/user/domain/user';

describe('Feature: Update a User', () => {
  let fixture: UserFixture;

  beforeEach(() => {
    fixture = CreateUserFixture();
  });

  describe('Rule: A user can be updated', () => {
    const user = userBuilder()
      .withId(1)
      .withEmail('user@gmail.com')
      .withPassword('password');

    test('With all required input', async () => {
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

    test('Should return error if email is empty', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: '',
        password: 'password',
      });

      fixture.thenErrorShouldBe(InvalidEmailError);
    });

    test('Should return error if email is invalid', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: 'bademail',
        password: 'password',
      });

      fixture.thenErrorShouldBe(InvalidEmailError);
    });

    test('Should return error when email is already used', async () => {
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

      fixture.thenErrorShouldBe(DuplicateEmailError);
    });

    test('Should return error if password is empty', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: 'user@gmail.com',
        password: '',
      });

      fixture.thenErrorShouldBe(PasswordCannotBeEmptyError);
    });

    test('Should return error if password is lower than 6 characters', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsUpdated({
        id: 1,
        email: 'user@gmail.com',
        password: '12345',
      });

      fixture.thenErrorShouldBe(PasswordMustBeAtLeast6CharactersError);
    });
  });
});
