import { ApiProperty } from '@nestjs/swagger';
import { AssignAttributePointsOutput } from '../../../../domain/usecases/assign-attribute-points.usecase';

export class LevelUpPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  vitality: number;
  @ApiProperty()
  agility: number;
  @ApiProperty()
  dexterity: number;
  @ApiProperty()
  strength: number;
  @ApiProperty()
  luck: number;

  static toPresent(output: AssignAttributePointsOutput): LevelUpPresenter {
    return {
      id: output.player.id,
      vitality: output.player.stats.vitality,
      agility: output.player.stats.agility,
      dexterity: output.player.stats.dexterity,
      strength: output.player.stats.strength,
      luck: output.player.stats.luck,
    };
  }
}
