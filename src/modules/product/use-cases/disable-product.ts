import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';
import { ProductNotFound } from './errors/product-not-found';

interface DisableProductRequest {
  productId: string;
}
interface DisableProductResponse {
  product: Product;
}

@Injectable()
export class DisableProduct {
  constructor(private productRepository: ProductsRepository) {}

  async execute(
    request: DisableProductRequest,
  ): Promise<DisableProductResponse> {
    const { productId } = request;

    const product = await this.productRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    product.disable();

    await this.productRepository.save(product);

    return { product };
  }
}
