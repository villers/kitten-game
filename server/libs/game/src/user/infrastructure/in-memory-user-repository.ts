import { UserRepository } from '@game/game/user/application/user.repository';
import { User } from '@game/game/user/domain/user';

export class InMemoryUserRepository implements UserRepository {
  private autoincrement = 1;
  private users = new Map<number, User>();

  async create(user: User): Promise<User> {
    if (!user.id) {
      user.editId(this.autoincrement++);
    }

    this.save(user);
    return Promise.resolve(User.fromData(user));
  }

  async emailExist(email: string): Promise<boolean> {
    const exist = [...this.users.values()].some((u) => u.email === email);
    return Promise.resolve(exist);
  }

  async update(user: User): Promise<User> {
    this.users.set(user.id, user);
    return Promise.resolve(User.fromData(user));
  }

  // used for test
  async findById(id: number): Promise<User> {
    return Promise.resolve(this.users.get(id));
  }

  givenExistingUser(users: User[]) {
    users.forEach(this.save.bind(this));
  }

  private save(user: User) {
    this.users.set(user.id, user);
  }
}
