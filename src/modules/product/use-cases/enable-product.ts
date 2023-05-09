import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';
import { ProductNotFound } from './errors/product-not-found';

interface EnableProductRequest {
  productId: string;
}
interface EnableProductResponse {
  product: Product;
}

@Injectable()
export class EnableProduct {
  constructor(private productRepository: ProductsRepository) {}

  async execute(request: EnableProductRequest): Promise<EnableProductResponse> {
    const { productId } = request;

    const product = await this.productRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    product.enable();

    await this.productRepository.save(product);

    return { product };
  }
}
