import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { Injectable } from '@nestjs/common';
import { ProductVariant, VariantTypes } from '../entities/product-variant';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';

interface AddVariantProductRequest {
  productId: string;
  type: VariantTypes;
}
interface AddVariantProductResponse {
  product: Product;
}

@Injectable()
export class AddVariantProduct {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    request: AddVariantProductRequest,
  ): Promise<AddVariantProductResponse> {
    const { type, productId } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const variant = new ProductVariant({ type });

    product.addVariant(variant);

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
