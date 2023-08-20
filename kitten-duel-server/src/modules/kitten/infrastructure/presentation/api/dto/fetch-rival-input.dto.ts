import { ApiProperty } from '@nestjs/swagger';

export class FetchRivalInputDto {
  @ApiProperty()
  currentPlayerId: string;
}
