import { ProductVariantNotFound } from '@modules/product-variant/use-cases/errors/product-variant-not-found';
import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';
import { Injectable } from '@nestjs/common';
import { OptionVariantNotFound } from './errors/option-variant-not-found';

interface SaveOptionVariantRequest {
  productId: string;
  variantId: string;
  optionSKU: string;
  title?: string;
  price?: number;
}

interface SaveOptionVariantResponse {
  product: Product;
}

@Injectable()
export class SaveOptionVariant {
  constructor(private productRepository: ProductsRepository) {}

  async execute(
    request: SaveOptionVariantRequest,
  ): Promise<SaveOptionVariantResponse> {
    const { optionSKU, productId, variantId, ...updateFields } = request;

    const product = await this.productRepository.product(productId);

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

    Object.assign(option, updateFields);

    variant.updateOption(optionSKU, option);

    await this.productRepository.save(product);

    return { product };
  }
}
