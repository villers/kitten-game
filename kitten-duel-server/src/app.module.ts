import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KittenModule } from './modules/kitten/kitten.module';

@Module({
  //imports: [TypeOrmModule.forRoot(), KittenModule],
  imports: [KittenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
