import { BattleRepository } from '../battle.repository';
import { KittenRepository } from '../../../kitten/application/kitten.repository';
import { Battle } from '../../domain/battle';
import { KittenNotFoundError } from '@game/game/kitten/domain/errors';
import { RandomGenerator } from '@game/game/utils/random/random-generator';

export interface CreateBattlePresenter {
  show(battle: Battle): void;
}

export interface CreateBattleCommand {
  attacker: string;
  defender: string;
}

export class CreateBattleUseCase {
  constructor(
    private readonly battleRepository: BattleRepository,
    private readonly kittenRepository: KittenRepository,
    private readonly randomGenerator: RandomGenerator,
  ) {}

  async handle(
    command: CreateBattleCommand,
    presenter: CreateBattlePresenter,
  ): Promise<void> {
    // fetch Kittens by name and chec kif they exist and throw KittenNotFoundError if not found
    const attacker = await this.kittenRepository.findByName(command.attacker);
    if (!attacker) {
      throw new KittenNotFoundError();
    }

    const defender = await this.kittenRepository.findByName(command.defender);
    if (!defender) {
      throw new KittenNotFoundError();
    }

    const combatants = [attacker, defender];
    const battle = new Battle(undefined, combatants, this.randomGenerator);
    battle.simulate();

    const createdBattle = await this.battleRepository.create(battle);
    presenter.show(createdBattle);
  }
}
