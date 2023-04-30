import { Module } from '@nestjs/common';
import { CategoryProductController } from './category-product.controller';
import { CreateCategoryProduct } from './use-cases/create-category-product';
import { SaveCategoryProduct } from './use-cases/save-category-product';
import { DeleteCategoryProduct } from './use-cases/delete-category-product';
import { GetCategoryProduct } from './use-cases/get-category-product';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { FilterCategoryProduct } from './use-cases/filter-category-product';

@Module({
  controllers: [CategoryProductController],
  providers: [
    CreateCategoryProduct,
    SaveCategoryProduct,
    DeleteCategoryProduct,
    GetCategoryProduct,
    FilterCategoryProduct,
    CloudinaryService,
  ],
  imports: [DatabaseModule],
})
export class CategoryProductModule {}
