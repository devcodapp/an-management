import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';

@Module({
  controllers: [OptionController],
})
export class OptionModule {}
