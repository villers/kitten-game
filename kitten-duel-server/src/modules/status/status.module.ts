import { Module } from '@nestjs/common';
import { StatusController } from './infrastructure/controller/StatusController';

@Module({
  imports: [],
  controllers: [StatusController],
  providers: [],
})
export class StatusModule {}
