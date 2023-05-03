import { ProductVariantNotFound } from '@modules/product-variant/use-cases/errors/product-variant-not-found';
import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';
import { Injectable } from '@nestjs/common';
import { OptionVariantNotFound } from '../errors/option-variant-not-found';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

interface AddImageOptionVariantRequest {
  productId: string;
  variantId: string;
  optionSKU: string;
  image: Express.Multer.File;
  order: number;
}
interface AddImageOptionVariantResponse {
  product: Product;
}

@Injectable()
export class AddImageOptionVariant {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: AddImageOptionVariantRequest,
  ): Promise<AddImageOptionVariantResponse> {
    const { variantId, productId, image, optionSKU, order } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const variant = product.variant(variantId);

    if (!variant) {
      throw new ProductVariantNotFound();
    }

    const option = variant.option(optionSKU);

    if (!option) {
      throw new OptionVariantNotFound();
    }

    const { public_id, url } = await this.cloudinary.uploadImage(image);

    const hasImageInOrder = option.image(order);
    if (hasImageInOrder) {
      option.removeImage(order);
    }

    option.addImage({ imageId: public_id, imageUrl: url, order });

    variant.updateOption(optionSKU, option);

    product.updateVariant(variantId, variant);

    await this.productsRepository.save(product);

    return {
      product,
    };
  }
}
