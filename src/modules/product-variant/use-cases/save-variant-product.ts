import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { Injectable } from '@nestjs/common';
import { VariantTypes } from '../entities/product-variant';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';
import { ProductVariantNotFound } from './errors/product-variant-not-found';

interface SaveVariantProductRequest {
  productId: string;
  variantId: string;
  type?: VariantTypes;
}
interface SaveVariantProductResponse {
  product: Product;
}

@Injectable()
export class SaveVariantProduct {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    request: SaveVariantProductRequest,
  ): Promise<SaveVariantProductResponse> {
    const { productId, variantId, ...updateFields } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const variant = product.variant(variantId);

    if (!variant) {
      throw new ProductVariantNotFound();
    }

    Object.assign(variant, updateFields);

    product.updateVariant(variantId, variant);

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
