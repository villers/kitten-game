import {
  UserEmailRequiredError,
  UserInvalidEmailFormatError,
} from '@game/game/user/domain/errors';

export class EmailText {
  private constructor(readonly value: string) {}

  static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static of(text: string) {
    if (text.trim().length === 0) {
      throw new UserEmailRequiredError('Email cannot be empty');
    }

    if (!this.isValid(text)) {
      throw new UserInvalidEmailFormatError('Email must be valid');
    }

    return new EmailText(text);
  }
}
