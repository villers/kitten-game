import { Module } from '@nestjs/common';
import { KittenModule } from './modules/kitten/kitten.module';
import { StatusModule } from './modules/status/status.module';

@Module({
  //imports: [TypeOrmModule.forRoot(), KittenModule],
  imports: [KittenModule, StatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
