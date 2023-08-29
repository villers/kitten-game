import { ApiProperty } from '@nestjs/swagger';

export class StatusPresenter {
  @ApiProperty()
  code: number;
  @ApiProperty()
  label: string;
}
