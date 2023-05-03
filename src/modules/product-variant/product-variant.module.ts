import { Module } from '@nestjs/common';
import { ProductVariantController } from './product-variant.controller';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { AddVariantProduct } from './use-cases/add-variant-product';
import { RemoveVariantProduct } from './use-cases/remove-variant-product';
import { SaveVariantProduct } from './use-cases/save-variant-product';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

@Module({
  controllers: [ProductVariantController],
  providers: [
    AddVariantProduct,
    RemoveVariantProduct,
    SaveVariantProduct,
    CloudinaryService,
  ],
  imports: [DatabaseModule],
})
export class ProductVariantModule {}
