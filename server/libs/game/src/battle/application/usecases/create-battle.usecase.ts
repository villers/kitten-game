import { BattleRepository } from '../battle.repository';
import { KittenRepository } from '../../../kitten/application/kitten.repository';
import { Battle } from '../../domain/battle';
import { Combatant } from '../../domain/combatant';
import { KittenNotFoundError } from '@game/game/kitten/domain/errors';

export interface CreateBattlePresenter {
  show(battle: Battle): void;
}

export interface CreateBattleCommand {
  combatants: Combatant[];
}

export class CreateBattleUseCase {
  constructor(
    private readonly battleRepository: BattleRepository,
    private readonly kittenRepository: KittenRepository,
  ) {}

  async handle(
    command: CreateBattleCommand,
    presenter: CreateBattlePresenter,
  ): Promise<void> {
    for (const combatant of command.combatants) {
      const kitten = await this.kittenRepository.findByName(
        combatant.kitten.name,
      );
      if (!kitten) {
        throw new KittenNotFoundError(
          `Kitten with ID ${combatant.kitten.id} not found`,
        );
      }
    }

    const battle = new Battle(undefined, command.combatants);
    battle.simulate();

    const createdBattle = await this.battleRepository.create(battle);
    presenter.show(createdBattle);
  }
}
