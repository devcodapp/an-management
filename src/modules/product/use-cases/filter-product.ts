import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';

interface FilterProductRequest {
  name?: string;
  price?: number;
  categoryId?: string;
}

interface FilterProductResponse {
  products: Product[] | null;
}

@Injectable()
export class FilterProduct {
  constructor(private productRepository: ProductsRepository) {}

  async execute(request: FilterProductRequest): Promise<FilterProductResponse> {
    const products = await this.productRepository.products(request);

    return { products };
  }
}
