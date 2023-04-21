import { Module } from '@nestjs/common';
import { CategoryAdditionalController } from './category-additional.controller';
import { CreateCategoryAdditional } from './use-cases/create-category-additional';
import { SaveCategoryAdditional } from './use-cases/save-category-additional';
import { DeleteCategoryAdditional } from './use-cases/delete-category-additional';
import { GetCategoryAdditional } from './use-cases/get-category-additional';
import { FilterCategoryAdditional } from './use-cases/filter-category-additional';
import { DatabaseModule } from '@shared/modules/database/database.module';

@Module({
  controllers: [CategoryAdditionalController],
  providers: [
    CreateCategoryAdditional,
    SaveCategoryAdditional,
    DeleteCategoryAdditional,
    GetCategoryAdditional,
    FilterCategoryAdditional,
  ],
  imports: [DatabaseModule],
})
export class CategoryAdditionalModule {}
