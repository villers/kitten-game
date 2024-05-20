import {
  UserEmailRequiredError,
  UserInvalidEmailFormatError,
  UserPasswordRequiredError,
  UserPasswordTooShortError,
} from '@game/game/user/domain/error';

export class User {
  constructor(
    private _id: number,
    private _email: EmailText,
    private _password: PasswordText,
  ) {}

  get id() {
    return this._id;
  }

  get email() {
    return this._email.value;
  }

  get password() {
    return this._password.value;
  }

  editId(id: number) {
    this._id = id;
  }

  editEmail(email: string) {
    this._email = EmailText.of(email);
  }

  editPassword(password: string) {
    this._password = PasswordText.of(password);
  }

  get data() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
    };
  }

  static fromData(data: User['data']) {
    return new User(
      data.id,
      EmailText.of(data.email),
      PasswordText.of(data.password),
    );
  }
}

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
