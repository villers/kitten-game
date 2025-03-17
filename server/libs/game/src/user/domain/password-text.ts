import {
  UserPasswordRequiredError,
  UserPasswordTooShortError,
} from '@game/game/user/domain/errors';

export class PasswordText {
  private constructor(readonly value: string) {}

  static of(text: string) {
    if (text.trim().length === 0) {
      throw new UserPasswordRequiredError('Password cannot be empty');
    }

    if (text.trim().length < 6) {
      throw new UserPasswordTooShortError(
        'Password must be at least 6 characters long',
      );
    }

    return new PasswordText(text);
  }
}
