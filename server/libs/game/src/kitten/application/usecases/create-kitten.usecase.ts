import { UserRepository } from '@game/game/user/application/user.repository';
import { DuplicateEmailError, User } from '@game/game/user/domain/user';
import { KittenRepository } from '@game/game/kitten/application/kitten.repository';
import { Kitten } from '@game/game/kitten/domain/kitten';

export class CreateKittenCommand {
  id?: number;
  name: string;
  user: number;
}

export class CreateKittenUseCase {
  constructor(
    private readonly kittenRepository: KittenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async handle(createKittenCommand: CreateKittenCommand) {
    const user = await this.userRepository.findById(createKittenCommand.user);
    if (!user) {
      throw new Error('User not found');
    }

    const existingKitten = await this.kittenRepository.nameExist(
      createKittenCommand.name,
    );
    if (existingKitten) {
      throw new Error('Kitten with the same name already exists');
    }

    const kitten = new Kitten(
      createKittenCommand.id,
      createKittenCommand.name,
      user,
    );
    await this.kittenRepository.create(kitten);
  }
}
