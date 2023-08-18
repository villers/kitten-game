import { ApiProperty } from '@nestjs/swagger';

export class OrganizeFightInputDto {
  @ApiProperty()
  kittenAId: string;
  @ApiProperty()
  kittenBId: string;
}
