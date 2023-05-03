import { ProductVariantNotFound } from '@modules/product-variant/use-cases/errors/product-variant-not-found';
import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';
import { Injectable } from '@nestjs/common';
import { OptionVariantNotFound } from './errors/option-variant-not-found';

interface EnableOptionVariantRequest {
  productId: string;
  variantId: string;
  optionSKU: string;
}

interface EnableOptionVariantResponse {
  product: Product;
}

@Injectable()
export class EnableOptionVariant {
  constructor(private productRepository: ProductsRepository) {}

  async execute(
    request: EnableOptionVariantRequest,
  ): Promise<EnableOptionVariantResponse> {
    const { optionSKU, productId, variantId } = request;

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

    option.enable();

    await this.productRepository.save(product);

    return { product };
  }
}
