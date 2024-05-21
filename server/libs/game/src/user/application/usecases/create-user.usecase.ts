import { UserRepository } from '@game/game/user/application/user.repository';
import { User } from '@game/game/user/domain/user';
import { UserEmailAlreadyInUseError } from '@game/game/user/domain/errors';

export class CreateUserCommand {
  id?: number;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(createUserCommand: CreateUserCommand) {
    const emailExist = await this.userRepository.emailExist(
      createUserCommand.email,
    );
    if (emailExist) {
      throw new UserEmailAlreadyInUseError();
    }
    await this.userRepository.create(
      User.fromData({
        id: createUserCommand.id,
        email: createUserCommand.email,
        password: createUserCommand.password,
      }),
    );
  }
}
