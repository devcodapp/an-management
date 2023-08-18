import { Injectable } from '@nestjs/common';
import { CategoryProduct } from '../entities/category-product';
import { CategoryProductsRepository } from '../repositories/category-product-repository';

interface FilterCategoryProductRequest {
  name?: string;
  restaurantId?: string;
  deleted?: boolean;
}

interface FilterCategoryProductResponse {
  categoryProducts: CategoryProduct[] | null;
}

@Injectable()
export class FilterCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductsRepository) {}

  async execute(
    request: FilterCategoryProductRequest,
  ): Promise<FilterCategoryProductResponse> {
    const categoryProducts =
      await this.categoryProductRepository.categoryProducts(request);

    return { categoryProducts };
  }
}
