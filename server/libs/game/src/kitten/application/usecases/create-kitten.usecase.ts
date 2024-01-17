import { UserRepository } from '@game/game/user/application/user.repository';
import { KittenRepository } from '@game/game/kitten/application/kitten.repository';
import {
  Kitten,
  KittenCreatedUserNotFoundError,
  KittenNameAlreadyExistError,
} from '@game/game/kitten/domain/kitten';

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
      throw new KittenCreatedUserNotFoundError(
        'Can create a kitten without a user',
      );
    }

    const existingKitten = await this.kittenRepository.nameExist(
      createKittenCommand.name,
    );
    if (existingKitten) {
      throw new KittenNameAlreadyExistError(
        'Kitten with the same name already exists',
      );
    }

    const kitten = new Kitten(
      createKittenCommand.id,
      createKittenCommand.name,
      user,
    );

    kitten.calculateInitialStats();

    await this.kittenRepository.create(kitten);
  }
}
