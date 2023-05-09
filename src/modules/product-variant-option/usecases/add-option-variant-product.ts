import { ProductVariantNotFound } from '@modules/product-variant/use-cases/errors/product-variant-not-found';
import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';
import { Injectable } from '@nestjs/common';
import { OptionVariantAlreadExists } from './errors/option-variant-alread-exists';
import { OptionVariant } from '../entities/product-variant-option';

interface AddOptionVariantRequest {
  productId: string;
  variantId: string;
  title: string;
  sku?: string;
  price?: number;
}
interface AddOptionVariantResponse {
  product: Product;
}

@Injectable()
export class AddOptionVariant {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    request: AddOptionVariantRequest,
  ): Promise<AddOptionVariantResponse> {
    const { title, variantId, sku, productId, price } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const variant = product.variant(variantId);

    if (!variant) {
      throw new ProductVariantNotFound();
    }

    if (sku) {
      const hasOptionWithThisSKU = variant.option(sku);
      if (hasOptionWithThisSKU) {
        throw new OptionVariantAlreadExists();
      }
    }

    const option = new OptionVariant({
      title,
      sku,
      price,
    });

    variant.addOption(option);

    await this.productsRepository.save(product);

    return {
      product,
    };
  }
}
