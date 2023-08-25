import { ApiProperty } from '@nestjs/swagger';
import { FetchRivalOutput } from '../../../../domain/usecases/fetch-rival.usecase';

class Rival {
  id: string;
  name: string;
  hp: number;
  level: number;
  defeats: number;
  victories: number;
}
export class FetchRivalPresenter {
  @ApiProperty({ type: [Rival] })
  rivals: Rival[];

  static toPresent(output: FetchRivalOutput): FetchRivalPresenter {
    return {
      rivals: output.players.map((player) => {
        return {
          id: player.id,
          name: player.name,
          hp: player.healthSystem.hp,
          level: player.levelingSystem.level,
          defeats: player.levelingSystem.defeats,
          victories: player.levelingSystem.victories,
        };
      }),
    };
  }
}
