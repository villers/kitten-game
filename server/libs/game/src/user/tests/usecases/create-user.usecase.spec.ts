import { userBuilder } from '@game/game/user/tests/user-builder';
import {
  UserFixture,
  CreateUserFixture,
} from '@game/game/user/tests/user-fixture';
import {
  DuplicateEmailError,
  EmailIsEmptyError,
  InvalidEmailError,
  PasswordCannotBeEmptyError,
  PasswordMustBeAtLeast6CharactersError,
} from '@game/game/user/domain/user';

describe('Feature: Create a User', () => {
  let fixture: UserFixture;

  beforeEach(() => {
    fixture = CreateUserFixture();
  });

  describe('Rule: A user can be created', () => {
    test('With all required input', async () => {
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

    test('Should return error if email is empty', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenUserIsCreate({
        id: 1,
        email: '',
        password: 'password',
      });

      fixture.thenErrorShouldBe(EmailIsEmptyError);
    });

    test('Should return error if email is invalid', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenUserIsCreate({
        id: 1,
        email: 'bademail',
        password: 'password',
      });

      fixture.thenErrorShouldBe(InvalidEmailError);
    });

    test('Should return error when email is already used', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      const user = userBuilder().withEmail('email@gmail.com');
      fixture.givenUsersExists([user.build()]);

      await fixture.whenUserIsCreate({
        id: 1,
        email: 'email@gmail.com',
        password: 'password',
      });

      fixture.thenErrorShouldBe(DuplicateEmailError);
    });

    test('Should return error if password is empty', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenUserIsCreate({
        id: 1,
        email: 'user@gmail.com',
        password: '',
      });

      fixture.thenErrorShouldBe(PasswordCannotBeEmptyError);
    });

    test('Should return error if password is lower than 6 characters', async () => {
      fixture.givenDateIs(new Date(2024, 1, 14, 10, 0, 0, 0));

      await fixture.whenUserIsCreate({
        id: 1,
        email: 'user@gmail.com',
        password: '12345',
      });

      fixture.thenErrorShouldBe(PasswordMustBeAtLeast6CharactersError);
    });
  });
});
