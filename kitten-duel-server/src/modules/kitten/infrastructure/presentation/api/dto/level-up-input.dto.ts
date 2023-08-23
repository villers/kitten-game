import { ApiProperty } from '@nestjs/swagger';

export class LevelUpInputDto {
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
}
