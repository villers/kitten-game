import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusPresenter } from '../prensenter/status.presenter';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor() {}

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'Returns the status of the server.',
    type: StatusPresenter,
  })
  getStatus(): StatusPresenter {
    return {
      code: 200,
      label: '✅ Server is working successfully !',
    };
  }
}
