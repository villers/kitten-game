import { User } from '@game/game/user/domain/user';

export class Kitten {
  constructor(
    private _id: number,
    private _name: string,
    private _user: User,
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get user() {
    return this._user;
  }

  editId(id) {
    this._id = id;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      user: this.user,
    };
  }

  static fromData(data: Kitten['data']) {
    return new Kitten(data.id, data.name, User.fromData(data.user));
  }
}
