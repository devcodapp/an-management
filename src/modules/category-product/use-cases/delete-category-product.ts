import { Injectable } from '@nestjs/common';
import { CategoryProductNotFound } from './errors/category-product-not-found';
import { CategoryProduct } from '../entities/category-product';
import { CategoryProductsRepository } from '../repositories/category-product-repository';

interface DeleteCategoryProductRequest {
  categoryProductId: string;
}
interface DeleteCategoryProductResponse {
  categoryProduct: CategoryProduct;
}

@Injectable()
export class DeleteCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductsRepository) {}

  async execute(
    request: DeleteCategoryProductRequest,
  ): Promise<DeleteCategoryProductResponse> {
    const { categoryProductId } = request;

    const categoryProduct =
      await this.categoryProductRepository.categoryProduct(categoryProductId);

    if (!categoryProduct) {
      throw new CategoryProductNotFound();
    }

    categoryProduct.deletedAt = new Date();
    categoryProduct.deletedWorker = '123';

    await this.categoryProductRepository.save(categoryProduct);

    return { categoryProduct };
  }
}
