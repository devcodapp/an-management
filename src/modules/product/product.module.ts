import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { ProductController } from './product.controller';
import { CreateProduct } from './use-cases/create-product';

@Module({
  controllers: [ProductController],
  providers: [CreateProduct],
  imports: [DatabaseModule],
})
export class ProductModule {}
