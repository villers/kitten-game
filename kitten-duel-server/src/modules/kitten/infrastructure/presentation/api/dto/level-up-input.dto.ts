import { ApiProperty } from '@nestjs/swagger';

export class LevelUpInputDto {
  @ApiProperty()
  hpPoints: number; // Points to be added to HP
  @ApiProperty()
  powerPoints: number; // Points to be added to Power
  @ApiProperty()
  defensePoints: number; // Points to be added to Defense
}
