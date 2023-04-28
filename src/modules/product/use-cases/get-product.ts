import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';

interface GetProductRequest {
  productId: string;
}

interface GetProductResponse {
  product: Product | null;
}

@Injectable()
export class GetProduct {
  constructor(private productRepository: ProductsRepository) {}

  async execute(request: GetProductRequest): Promise<GetProductResponse> {
    const { productId } = request;

    const product = await this.productRepository.product(productId);

    return { product };
  }
}
