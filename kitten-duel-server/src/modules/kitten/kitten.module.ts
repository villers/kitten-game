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
import { FetchRivalController } from './infrastructure/presentation/api/controllers/fetch-rival.controller';
import { FetchRivalUsecase } from './domain/usecases/fetch-rival.usecase';
import { LevelUpController } from './infrastructure/presentation/api/controllers/level-up.controller';
import { AssignAttributePointsUsecase } from './domain/usecases/assign-attribute-points.usecase';
import { SkillRegistry } from './domain/skills/skill.registry';
import { RandomService } from './domain/services/random.service';
import { BuffService } from './domain/services/buff.service';
import { NapTime } from './domain/skills/nap-time';
import { NineLives } from './domain/skills/nine-lives';
import { SharpClaws } from './domain/skills/sharp-claws';
import { Hairball } from './domain/skills/hairball';
import { Distract } from './domain/skills/distract';
import { FightService } from './domain/services/fight.service';
import { Pounce } from './domain/skills/pounce';
import { PurrHealing } from './domain/skills/purr-healing';
import { FurySwipe } from './domain/skills/fury-swipe';
import { MysticalMeow } from './domain/skills/mystical-meow';
import { ProtectivePurr } from './domain/skills/protective-purr';

@Module({
  imports: [],
  controllers: [
    OrganizeFightController,
    FetchRivalController,
    LevelUpController,
  ],
  providers: [
    {
      provide: AssignAttributePointsUsecase,
      useFactory: (kittenRepository: KittenRepository) =>
        new AssignAttributePointsUsecase(kittenRepository),
      inject: [KITTEN_REPOSITORY],
    },
    {
      provide: OrganizeFightUsecase,
      useFactory: (
        equipmentRepository: EquipmentRepository,
        fightRepository: FightRepository,
        kittenRepository: KittenRepository,
        fightService: FightService,
        buffService: BuffService,
      ) =>
        new OrganizeFightUsecase(
          equipmentRepository,
          fightRepository,
          kittenRepository,
          fightService,
          buffService,
        ),
      inject: [
        EQUIPMENT_REPOSITORY,
        FIGHT_REPOSITORY,
        KITTEN_REPOSITORY,
        FightService,
        BuffService,
      ],
    },
    {
      provide: FetchRivalUsecase,
      useFactory: (kittenRepository: KittenRepository) =>
        new FetchRivalUsecase(kittenRepository),
      inject: [KITTEN_REPOSITORY],
    },
    {
      provide: FightService,
      useFactory: (
        skillRegistry: SkillRegistry,
        randomService: RandomService,
        buffService: BuffService,
      ) => new FightService(skillRegistry, randomService, buffService),
      inject: [SkillRegistry, RandomService, BuffService],
    },
    {
      provide: SkillRegistry,
      useFactory: (buffService: BuffService, randomService: RandomService) => {
        const registry = new SkillRegistry();
        registry.register(new Pounce(buffService, randomService));
        registry.register(new NapTime(randomService));
        registry.register(new NineLives(buffService, randomService));
        registry.register(new SharpClaws(buffService, randomService));
        registry.register(new Hairball(randomService));
        registry.register(new PurrHealing(randomService));
        registry.register(new Distract(buffService, randomService));
        registry.register(new FurySwipe(randomService));
        registry.register(new MysticalMeow(buffService, randomService));
        registry.register(new ProtectivePurr(buffService, randomService));

        return registry;
      },
      inject: [BuffService, RandomService],
    },
    {
      provide: RandomService,
      useFactory: () => new RandomService(),
    },
    {
      provide: BuffService,
      useFactory: () => new BuffService(),
    },
    { provide: KITTEN_REPOSITORY, useClass: KittenRepositoryImpl },
    { provide: EQUIPMENT_REPOSITORY, useClass: EquipmentRepositoryImpl },
    { provide: FIGHT_REPOSITORY, useClass: FightRepositoryImpl },
  ],
})
export class KittenModule {}
