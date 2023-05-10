import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { ProductController } from './product.controller';
import { CreateProduct } from './use-cases/create-product';
import { SaveProduct } from './use-cases/save-product';
import { EnableProduct } from './use-cases/enable-product';
import { DisableProduct } from './use-cases/disable-product';
import { DeleteProduct } from './use-cases/delete-product';
import { GetProduct } from './use-cases/get-product';
import { FilterProduct } from './use-cases/filter-product';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProduct,
    SaveProduct,
    EnableProduct,
    DisableProduct,
    DeleteProduct,
    GetProduct,
    FilterProduct,
  ],
  imports: [DatabaseModule],
})
export class ProductModule {}
