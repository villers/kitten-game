import { Module } from '@nestjs/common';
import { StatusController } from './infrastructure/controller/status.controller';

@Module({
  imports: [],
  controllers: [StatusController],
  providers: [],
})
export class StatusModule {}
