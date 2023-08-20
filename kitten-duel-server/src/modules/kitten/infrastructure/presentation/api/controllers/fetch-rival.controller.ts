import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FetchRivalUsecase } from '../../../../domain/usecases/fetch-rival.usecase';
import { FetchRivalInputDto } from '../dto/fetch-rival-input.dto';
import { FetchRivalPresenter } from '../presenters/fetch-rival.presenter';

@ApiTags('rivals')
@Controller('rivals')
export class FetchRivalController {
  constructor(private fetchRivalUsecase: FetchRivalUsecase) {}

  @Post()
  @ApiBody({ type: FetchRivalInputDto })
  @ApiResponse({
    status: 200,
    description: 'Returns opponents to choose an opponant for a duel.',
    type: FetchRivalPresenter,
  })
  async organize(
    @Body() inputs: FetchRivalInputDto,
  ): Promise<FetchRivalPresenter> {
    const output = await this.fetchRivalUsecase.execute(inputs);
    return FetchRivalPresenter.toPresent(output);
  }
}
