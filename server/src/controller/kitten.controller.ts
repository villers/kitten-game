import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  CreateKittenCommand,
  CreateKittenUseCase,
} from '@game/game/kitten/application/usecases/create-kitten.usecase';

@Controller('api/kitten')
export class KittenController {
  constructor(private readonly createKittenUseCase: CreateKittenUseCase) {}

  @Post()
  async create(@Body() body: { name: string; user: number }) {
    const createKittenCommand: CreateKittenCommand = {
      id: undefined,
      name: body.name,
      user: body.user,
    };
    try {
      await this.createKittenUseCase.handle(createKittenCommand);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}
