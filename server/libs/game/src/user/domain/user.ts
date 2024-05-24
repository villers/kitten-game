import { PasswordText } from '@game/game/user/domain/password-text';
import { EmailText } from '@game/game/user/domain/email-text';

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

  set email(email: string) {
    this._email = EmailText.of(email);
  }

  set password(password: string) {
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
