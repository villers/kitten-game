import { Kitten } from '../entities/kitten.entity';
import { KittenRepository } from '../repositories/kitten.repository';

export type FetchRivalInput = {
  currentPlayerId: string;
};

export type FetchRivalOutput = {
  players: Kitten[];
};

export class FetchRivalUsecase {
  constructor(private kittenRepository: KittenRepository) {}

  async execute(inputs: FetchRivalInput): Promise<FetchRivalOutput> {
    const currentPlayer = {
      ...(await this.kittenRepository.findById(inputs.currentPlayerId)),
    };

    const currentPlayerLevel = currentPlayer.levelingSystem.level;

    const rivals = [
      ...(await this.kittenRepository.findFightKittens(
        currentPlayerLevel,
        currentPlayer.id,
        3,
        8,
      )),
    ];

    return {
      players: rivals,
    };
  }
}
