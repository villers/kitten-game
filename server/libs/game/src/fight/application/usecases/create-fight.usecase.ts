import { Kitten } from '@game/game/kitten/domain/kitten';
import { Fight } from '@game/game/fight/domain/fight';
import { FightRepository } from '@game/game/fight/application/fight.repository';
import { InMemoryKittenRepository } from '@game/game/kitten/infrastructure/in-memory-kitten-repository';
import { KittenNotFoundError } from '@game/game/kitten/domain/errors';

export interface CreateFightPresenter {
  show(fight: Fight): void;
}

export interface CreateFightCommand {
  kitten1: Kitten;
  kitten2: Kitten;
}

export class CreateFightUsecase {
  constructor(
    private readonly fightRepository: FightRepository,
    private readonly kittenRepository: InMemoryKittenRepository,
  ) {}

  async handle(
    createFightCommand: CreateFightCommand,
    presenter: CreateFightPresenter,
  ): Promise<void> {
    const existingKitten1 = await this.kittenRepository.findById(
      createFightCommand.kitten1.id,
    );
    if (!existingKitten1) {
      throw new KittenNotFoundError('Kitten 1 does not exist');
    }

    const existingKitten2 = await this.kittenRepository.findById(
      createFightCommand.kitten2.id,
    );
    if (!existingKitten2) {
      throw new KittenNotFoundError('Kitten 2 does not exist');
    }

    const fight = new Fight(
      undefined,
      createFightCommand.kitten1,
      createFightCommand.kitten2,
    );

    fight.simulate();

    const createdFight = await this.fightRepository.create(fight);

    presenter.show(createdFight);
  }
}
