import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product-repository';
import { Product, ProductProps } from '../entities/product';
import { ProductNotFound } from './errors/product-not-found';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

interface SaveProductRequest {
  productId: string;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
}
interface SaveProductResponse {
  product: Product;
}

@Injectable()
export class SaveProduct {
  constructor(
    private productRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(request: SaveProductRequest): Promise<SaveProductResponse> {
    const { productId, ...updateFields } = request;

    const product = await this.productRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    Object.assign(product, updateFields);

    await this.productRepository.save(product);

    return { product };
  }
}
