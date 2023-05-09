import { Module } from '@nestjs/common';
import { ProductVariantOptionController } from './product-variant-option.controller';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { AddOptionVariant } from './usecases/add-option-variant-product';
import { SaveOptionVariant } from './usecases/save-option-variant-product';
import { RemoveOptionVariant } from './usecases/remove-option-variant-product';
import { EnableOptionVariant } from './usecases/enable-option-variant-product';
import { DisableOptionVariant } from './usecases/disable-option-variant-product';
import { AddImageOptionVariant } from './usecases/images/add-image-option-variant-product';
import { RemoveImageOptionVariant } from './usecases/images/remove-image-option-variant-product';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

@Module({
  controllers: [ProductVariantOptionController],
  providers: [
    AddOptionVariant,
    SaveOptionVariant,
    RemoveOptionVariant,
    EnableOptionVariant,
    DisableOptionVariant,
    AddImageOptionVariant,
    RemoveImageOptionVariant,
    CloudinaryService,
  ],
  imports: [DatabaseModule],
})
export class ProductVariantOptionModule {}
