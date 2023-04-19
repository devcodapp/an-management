import { Module } from '@nestjs/common';
import { AdditionalController } from './additional.controller';

@Module({
  controllers: [AdditionalController],
})
export class AdditionalModule {}
