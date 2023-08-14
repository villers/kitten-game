import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusInterace } from '../../domain/interface/StatusInterace';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor() {}

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'Returns the winning kitten.',
    type: StatusInterace,
  })
  getStatus(): StatusInterace {
    return {
      code: 200,
      label: '✅ Server is working successfully !',
    };
  }
}
