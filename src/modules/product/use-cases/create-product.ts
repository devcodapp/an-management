import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../entities/product';
import { ProductsRepository } from '../repositories/product-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}
interface CreateProductResponse {
  product: Product;
}

@Injectable()
export class CreateProduct {
  constructor(
    private productsRepository: ProductsRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const { categoryId, name, price, description } = request;

    const product = new Product(
      {
        name,
        categoryId,
        price: Number(price),
        description,
      },
      { createdUser: this.req['user'].sub },
    );

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
