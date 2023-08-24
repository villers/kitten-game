import { ApiProperty } from '@nestjs/swagger';

export class OrganizeFightInputDto {
  @ApiProperty()
  attackerId: string;
  @ApiProperty()
  defenderId: string;
}
