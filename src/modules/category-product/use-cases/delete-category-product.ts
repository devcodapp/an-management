import { Inject, Injectable } from '@nestjs/common';
import { CategoryProductNotFound } from './errors/category-product-not-found';
import { CategoryProduct } from '../entities/category-product';
import { CategoryProductsRepository } from '../repositories/category-product-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface DeleteCategoryProductRequest {
  categoryProductId: string;
}
interface DeleteCategoryProductResponse {
  categoryProduct: CategoryProduct;
}

@Injectable()
export class DeleteCategoryProduct {
  constructor(
    private categoryProductRepository: CategoryProductsRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: DeleteCategoryProductRequest,
  ): Promise<DeleteCategoryProductResponse> {
    const { categoryProductId } = request;

    const categoryProduct =
      await this.categoryProductRepository.categoryProduct(categoryProductId);

    if (!categoryProduct) {
      throw new CategoryProductNotFound();
    }

    categoryProduct.delete(this.req['user'].sub);

    await this.categoryProductRepository.save(categoryProduct);

    return { categoryProduct };
  }
}
