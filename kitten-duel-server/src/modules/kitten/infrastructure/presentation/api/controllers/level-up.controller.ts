import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignAttributePointsUsecase } from '../../../../domain/usecases/assign-attribute-points.usecase';
import { LevelUpInputDto } from '../dto/level-up-input.dto';
import { LevelUpPresenter } from '../presenters/level-up.presenter';

@ApiTags('level-up')
@Controller('level-up')
export class LevelUpController {
  constructor(
    private assignAttributePointsUsecase: AssignAttributePointsUsecase,
  ) {}

  @Post(':id')
  @ApiBody({ type: LevelUpInputDto })
  @ApiResponse({
    status: 200,
    description: 'return kitten updated.',
    type: LevelUpPresenter,
  })
  async update(
    @Param('id') id: string,
    @Body() inputs: LevelUpInputDto,
  ): Promise<LevelUpPresenter> {
    const output = await this.assignAttributePointsUsecase.execute(id, inputs);
    return LevelUpPresenter.toPresent(output);
  }
}
