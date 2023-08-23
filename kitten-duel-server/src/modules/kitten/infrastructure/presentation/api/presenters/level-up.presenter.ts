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
  force: number;
  @ApiProperty()
  luck: number;

  static toPresent(output: AssignAttributePointsOutput): LevelUpPresenter {
    return {
      id: output.player.id,
      vitality: output.player.vitality,
      agility: output.player.agility,
      dexterity: output.player.dexterity,
      force: output.player.force,
      luck: output.player.luck,
    };
  }
}
