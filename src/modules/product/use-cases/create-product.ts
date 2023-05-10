import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product';
import { ProductsRepository } from '../repositories/product-repository';

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
  constructor(private productsRepository: ProductsRepository) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const { categoryId, name, price, description } = request;

    const product = new Product(
      {
        name,
        categoryId,
        price: Number(price),
        description,
      },
      { createdWorker: '123' },
    );

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
