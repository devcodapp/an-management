import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';
import { ProductNotFound } from './errors/product-not-found';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
interface DeleteProductRequest {
  productId: string;
}
interface DeleteProductResponse {
  product: Product;
}

@Injectable()
export class DeleteProduct {
  constructor(
    private productRepository: ProductsRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: DeleteProductRequest): Promise<DeleteProductResponse> {
    const { productId } = request;

    const product = await this.productRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    product.delete(this.req['user'].sub);

    await this.productRepository.save(product);

    return { product };
  }
}
