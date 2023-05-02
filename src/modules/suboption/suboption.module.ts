import { Module } from '@nestjs/common';
import { SuboptionController } from './suboption.controller';

@Module({
  controllers: [SuboptionController]
})
export class SuboptionModule {}
