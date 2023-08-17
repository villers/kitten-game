import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizeFightUsecase } from '../../../../domain/usecases/organize-fight.usecase';
import { OrganizeFightPresenter } from '../presenters/organize-fight.presenter';
import { OrganizeFightInputDto } from '../dto/organize-fight-input.dto';

@ApiTags('fights')
@Controller('fights')
export class OrganizeFightController {
  constructor(private organizeFightUsecase: OrganizeFightUsecase) {}

  @Post()
  @ApiBody({ type: OrganizeFightInputDto })
  @ApiResponse({
    status: 200,
    description: 'Returns details about a duel.',
    type: OrganizeFightPresenter,
  })
  async organize(
    @Body() inputs: OrganizeFightInputDto,
  ): Promise<OrganizeFightPresenter> {
    const output = await this.organizeFightUsecase.execute(inputs);
    return OrganizeFightPresenter.toPresent(output);
  }
}
