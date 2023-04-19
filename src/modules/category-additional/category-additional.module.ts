import { Module } from '@nestjs/common';
import { CategoryAdditionalController } from './category-additional.controller';

@Module({
  controllers: [CategoryAdditionalController],
})
export class CategoryAdditionalModule {}
