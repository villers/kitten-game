import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { CreateUserUseCase } from '@game/game/user/application/usecases/create-user.usecase';
import { PrismaService } from './service/prisma.service';
import { UserRepositoryPrisma } from './repository/user.repository';
import { UpdateUserUseCase } from '@game/game/user/application/usecases/update-user.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: UserRepositoryPrisma) => {
        return new CreateUserUseCase(userRepository);
      },
      inject: [UserRepositoryPrisma],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepository: UserRepositoryPrisma) => {
        return new UpdateUserUseCase(userRepository);
      },
      inject: [UserRepositoryPrisma],
    },
    PrismaService,
    UserRepositoryPrisma,
  ],
})
export class AppModule {}
