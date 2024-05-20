import { UserRepository } from '@game/game/user/application/user.repository';
import { User } from '@game/game/user/domain/user';
import { UserEmailAlreadyInUseError } from '@game/game/user/domain/error';

export class UpdateUserCommand {
  id: number;
  email: string;
  password: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(updateUserCommand: UpdateUserCommand) {
    const user = await this.userRepository.findById(updateUserCommand.id);
    if (user.email !== updateUserCommand.email) {
      const emailExist = await this.userRepository.emailExist(
        updateUserCommand.email,
      );
      if (emailExist) {
        throw new UserEmailAlreadyInUseError();
      }
    }
    await this.userRepository.update(
      User.fromData({
        id: updateUserCommand.id,
        email: updateUserCommand.email,
        password: updateUserCommand.password,
      }),
    );
  }
}
