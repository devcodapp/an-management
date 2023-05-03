import { ProductVariantNotFound } from '@modules/product-variant/use-cases/errors/product-variant-not-found';
import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';
import { Injectable } from '@nestjs/common';
import { OptionVariantNotFound } from '../errors/option-variant-not-found';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

interface RemoveImageOptionVariantRequest {
  productId: string;
  variantId: string;
  optionSKU: string;
  order: number;
}
interface RemoveImageOptionVariantResponse {
  product: Product;
}

@Injectable()
export class RemoveImageOptionVariant {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: RemoveImageOptionVariantRequest,
  ): Promise<RemoveImageOptionVariantResponse> {
    const { variantId, productId, optionSKU, order } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const variant = product?.variant(variantId);

    if (!variant) {
      throw new ProductVariantNotFound();
    }

    const option = variant.option(optionSKU);

    if (!option) {
      throw new OptionVariantNotFound();
    }

    const image = option.image(order);

    if (!image) {
      throw new Error('Image not found');
    }

    await this.cloudinary.deleteImage(image.imageId);

    option.removeImage(order);

    variant.updateOption(optionSKU, option);

    product.updateVariant(variantId, variant);

    await this.productsRepository.save(product);

    return {
      product,
    };
  }
}
