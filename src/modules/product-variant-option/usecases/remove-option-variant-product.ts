import { ProductVariantNotFound } from '@modules/product-variant/use-cases/errors/product-variant-not-found';
import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';
import { Injectable } from '@nestjs/common';
import { OptionVariantAlreadExists } from './errors/option-variant-alread-exists';
import { OptionVariant } from '../entities/product-variant-option';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { OptionVariantNotFound } from './errors/option-variant-not-found';

interface RemoveOptionVariantRequest {
  productId: string;
  variantId: string;
  optionSKU: string;
}
interface RemoveOptionVariantResponse {
  product: Product;
}

@Injectable()
export class RemoveOptionVariant {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: RemoveOptionVariantRequest,
  ): Promise<RemoveOptionVariantResponse> {
    const { variantId, productId, optionSKU } = request;

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

    const images = option?.images?.map((image) => image.imageId);

    if (images) await this.cloudinary.deleteImages(images);

    variant.removeOption(optionSKU);

    await this.productsRepository.save(product);

    return {
      product,
    };
  }
}
