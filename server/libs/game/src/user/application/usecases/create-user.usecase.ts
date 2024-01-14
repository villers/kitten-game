import { UserRepository } from '@game/game/user/application/user.repository';
import { DuplicateEmailError, User } from '@game/game/user/domain/user';

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
      throw new DuplicateEmailError();
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
