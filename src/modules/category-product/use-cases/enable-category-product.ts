import { Injectable } from '@nestjs/common';
import { CategoryProduct } from '../entities/category-product';
import { CategoryProductsRepository } from '../repositories/category-product-repository';
import { CategoryProductNotFound } from './errors/category-product-not-found';

interface EnableCategoryProductRequest {
  categoryProductId: string;
}
interface EnableCategoryProductResponse {
  categoryProduct: CategoryProduct;
}

@Injectable()
export class EnableCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductsRepository) {}

  async execute(
    request: EnableCategoryProductRequest,
  ): Promise<EnableCategoryProductResponse> {
    const { categoryProductId } = request;

    const categoryProduct =
      await this.categoryProductRepository.categoryProduct(categoryProductId);

    if (!categoryProduct) {
      throw new CategoryProductNotFound();
    }

    categoryProduct.enable();

    await this.categoryProductRepository.save(categoryProduct);

    return { categoryProduct };
  }
}
