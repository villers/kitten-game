import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUserCommand,
  CreateUserUseCase,
} from '@game/game/user/application/usecases/create-user.usecase';
import {
  UpdateUserCommand,
  UpdateUserUseCase,
} from '@game/game/user/application/usecases/update-user.usecase';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: { email: string; password: string }) {
    const createUserCommand: CreateUserCommand = {
      id: undefined,
      email: body.email,
      password: body.password,
    };
    try {
      await this.createUserUseCase.handle(createUserCommand);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: { email: string; password: string },
  ) {
    const updateUserCommand: UpdateUserCommand = {
      id: id,
      email: body.email,
      password: body.password,
    };
    try {
      await this.updateUserUseCase.handle(updateUserCommand);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}
