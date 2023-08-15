import { ApiProperty } from '@nestjs/swagger';

export class StatusInterace {
  @ApiProperty()
  code: number;
  @ApiProperty()
  label: string;
}
