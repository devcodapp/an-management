import { ProductVariantNotFound } from '@modules/product-variant/use-cases/errors/product-variant-not-found';
import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';
import { Injectable } from '@nestjs/common';
import { OptionVariantNotFound } from './errors/option-variant-not-found';

interface DisableOptionVariantRequest {
  productId: string;
  variantId: string;
  optionSKU: string;
}

interface DisableOptionVariantResponse {
  product: Product;
}

@Injectable()
export class DisableOptionVariant {
  constructor(private productRepository: ProductsRepository) {}

  async execute(
    request: DisableOptionVariantRequest,
  ): Promise<DisableOptionVariantResponse> {
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

    option.disable();

    variant.updateOption(optionSKU, option);

    product.updateVariant(variantId, variant);

    await this.productRepository.save(product);

    return { product };
  }
}
