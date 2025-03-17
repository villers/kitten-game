import { UserRepository } from '@game/game/user/application/user.repository';
import { KittenRepository } from '@game/game/kitten/application/kitten.repository';
import {
  UserNotFoundForKittenCreationError,
  KittenNameAlreadyExistError,
} from '@game/game/kitten/domain/errors';
import { Kitten } from '@game/game/kitten/domain/kitten';
import { KittenAttributes } from '@game/game/kitten/domain/kitten-attributes';
import { StatValue } from '@game/game/kitten/domain/stat-value';
import { KittenEquipment } from '@game/game/kitten/domain/kitten-equipment';
import { SkillAction } from '@game/game/kitten/domain/skill-action';
import { DefaultRandomGenerator } from '@game/game/utils/random/random-generator';
import { KittenStatus } from '@game/game/kitten/domain/kitten-status';

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
      throw new UserNotFoundForKittenCreationError(
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

    const attributes = new KittenAttributes(
      0, // hp, will be calculated
      0, // maxHp, will be calculated
      StatValue.of(0), // endurance
      StatValue.of(0), // strength
      StatValue.of(0), // agility
      StatValue.of(0), // speed
    );
    const equipment = new KittenEquipment();
    const skills: SkillAction[] = []; // Initialize with no skills or predefined skills

    const kitten = new Kitten(
      createKittenCommand.id,
      createKittenCommand.name,
      user,
      1, // starting level
      0, // starting xp
      attributes,
      new KittenStatus(), // no status effects
      skills,
      equipment,
      1, // starting initiative
      new DefaultRandomGenerator(),
    );

    kitten.calculateInitialStats();
    await this.kittenRepository.create(kitten);
  }
}
