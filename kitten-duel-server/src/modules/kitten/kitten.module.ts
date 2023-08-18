import { Module } from '@nestjs/common';
import { OrganizeFightController } from './infrastructure/presentation/api/controllers/organize-fight.controller';
import { KittenRepositoryImpl } from './infrastructure/persistance/memory/kitten.repository.impl';
import { EquipmentRepositoryImpl } from './infrastructure/persistance/memory/equipment.repository.impl';
import { FightRepositoryImpl } from './infrastructure/persistance/memory/fight.repository.impl';
import { OrganizeFightUsecase } from './domain/usecases/organize-fight.usecase';
import {
  FIGHT_REPOSITORY,
  FightRepository,
} from './domain/repositories/fight.repository';
import {
  KITTEN_REPOSITORY,
  KittenRepository,
} from './domain/repositories/kitten.repository';
import {
  EQUIPMENT_REPOSITORY,
  EquipmentRepository,
} from './domain/repositories/equipment.repository';

@Module({
  imports: [],
  controllers: [OrganizeFightController],
  providers: [
    {
      provide: OrganizeFightUsecase,
      useFactory: (
        equipmentRepository: EquipmentRepository,
        fightRepository: FightRepository,
        kittenRepository: KittenRepository,
      ) =>
        new OrganizeFightUsecase(
          equipmentRepository,
          fightRepository,
          kittenRepository,
        ),
      inject: [EQUIPMENT_REPOSITORY, FIGHT_REPOSITORY, KITTEN_REPOSITORY],
    },
    { provide: KITTEN_REPOSITORY, useClass: KittenRepositoryImpl },
    { provide: EQUIPMENT_REPOSITORY, useClass: EquipmentRepositoryImpl },
    { provide: FIGHT_REPOSITORY, useClass: FightRepositoryImpl },
  ],
})
export class KittenModule {}
