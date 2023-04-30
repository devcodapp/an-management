import { Injectable } from '@nestjs/common';
import { CategoryProduct } from '../entities/category-product';
import { CategoryProductsRepository } from '../repositories/category-product-repository';

interface GetCategoryProductRequest {
  id: string;
}

interface GetCategoryProductResponse {
  categoryProduct: CategoryProduct | null;
}

@Injectable()
export class GetCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductsRepository) {}

  async execute(
    request: GetCategoryProductRequest,
  ): Promise<GetCategoryProductResponse> {
    const { id } = request;

    const categoryProduct =
      await this.categoryProductRepository.categoryProduct(id);
    return { categoryProduct };
  }
}
