import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { CreateUserUseCase } from '@game/game/user/application/usecases/create-user.usecase';
import { PrismaService } from './service/prisma.service';
import { UserRepositoryPrisma } from './repository/user.repository';
import { UpdateUserUseCase } from '@game/game/user/application/usecases/update-user.usecase';
import { KittenRepositoryPrisma } from './repository/kitten.repository';
import { CreateKittenUseCase } from '@game/game/kitten/application/usecases/create-kitten.usecase';
import { KittenController } from './controller/kitten.controller';

@Module({
  imports: [],
  controllers: [UserController, KittenController],
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
    {
      provide: CreateKittenUseCase,
      useFactory: (
        kittenRepository: KittenRepositoryPrisma,
        userRepository: UserRepositoryPrisma,
      ) => {
        return new CreateKittenUseCase(kittenRepository, userRepository);
      },
      inject: [KittenRepositoryPrisma, UserRepositoryPrisma],
    },
    PrismaService,
    UserRepositoryPrisma,
    KittenRepositoryPrisma,
  ],
})
export class AppModule {}
