import { ApiProperty } from '@nestjs/swagger';

export class LevelUpInputDto {
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
}
