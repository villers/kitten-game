import { User } from '@game/game/user/domain/user';

export interface UserRepository {
  create(user: User): Promise<User>;
  emailExist(email: string): Promise<boolean>;
  update(user: User): Promise<User>;
  findById(id: number): Promise<User>;
}
