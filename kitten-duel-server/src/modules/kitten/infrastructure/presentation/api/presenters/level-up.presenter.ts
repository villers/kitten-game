import { ApiProperty } from '@nestjs/swagger';
import { AssignAttributePointsOutput } from '../../../../domain/usecases/assign-attribute-points.usecase';

export class LevelUpPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  power: number; // Attack power
  @ApiProperty()
  hp: number; // Hit points or health
  @ApiProperty()
  defense: number; // Defense against attacks
  @ApiProperty()
  speed: number; // Determines attack order, higher speed attacks first
  @ApiProperty()
  equipmentIds: string[];
  @ApiProperty()
  victories: number;
  @ApiProperty()
  defeats: number;
  @ApiProperty()
  level: number = 1;
  @ApiProperty()
  xp: number = 0; // Experience points accumulated by the kitten
  @ApiProperty()
  availableAttributePoints: number = 0; // Points available for distribution

  static toPresent(output: AssignAttributePointsOutput): LevelUpPresenter {
    return {
      id: output.player.id,
      name: output.player.name,
      power: output.player.power,
      hp: output.player.hp,
      defense: output.player.defense,
      speed: output.player.speed,
      equipmentIds: output.player.equipmentIds,
      victories: output.player.victories,
      defeats: output.player.defeats,
      level: output.player.level,
      xp: output.player.xp,
      availableAttributePoints: output.player.availableAttributePoints,
    };
  }
}
