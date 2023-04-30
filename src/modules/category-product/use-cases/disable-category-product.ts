import { Injectable } from '@nestjs/common';
import { CategoryProduct } from '../entities/category-product';
import { CategoryProductsRepository } from '../repositories/category-product-repository';
import { CategoryProductNotFound } from './errors/category-product-not-found';

interface DisableCategoryProductRequest {
  categoryProductId: string;
}
interface DisableCategoryProductResponse {
  categoryProduct: CategoryProduct;
}

@Injectable()
export class DisableCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductsRepository) {}

  async execute(
    request: DisableCategoryProductRequest,
  ): Promise<DisableCategoryProductResponse> {
    const { categoryProductId } = request;

    const categoryProduct =
      await this.categoryProductRepository.categoryProduct(categoryProductId);

    if (!categoryProduct) {
      throw new CategoryProductNotFound();
    }

    categoryProduct.disable();

    await this.categoryProductRepository.save(categoryProduct);

    return { categoryProduct };
  }
}
