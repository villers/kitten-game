import { Module } from '@nestjs/common';
import { KittenService } from './application/services/kitten.service';
import { EquipmentService } from './application/services/equipment.service';
import { DuelService } from './application/services/duel.service';
import { KittenController } from './infrastructure/controllers/kitten.controller';
import { EquipmentController } from './infrastructure/controllers/equipment.controller';
import { DuelController } from './infrastructure/controllers/duel.controller';
import { KittenRepository } from './infrastructure/repository-implementations/memory/kitten.repository';
import { EquipmentRepository } from './infrastructure/repository-implementations/memory/equipment.repository';
import { DuelRepository } from './infrastructure/repository-implementations/memory/duel.repository';

@Module({
  imports: [],
  controllers: [KittenController, EquipmentController, DuelController],
  providers: [
    KittenService,
    EquipmentService,
    DuelService,
    { provide: 'IKittenRepository', useClass: KittenRepository },
    { provide: 'IEquipmentRepository', useClass: EquipmentRepository },
    { provide: 'IDuelRepository', useClass: DuelRepository },
  ],
})
export class KittenModule {}
