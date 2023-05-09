import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { ProductNotFound } from '../errors/product-not-found';
import { Product } from '@modules/product/entities/product';

interface RemoveImageProductRequest {
  productId: string;
  order: number;
}
interface RemoveImageProductResponse {
  product: Product;
}

@Injectable()
export class CreateProduct {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: RemoveImageProductRequest,
  ): Promise<RemoveImageProductResponse> {
    const { order, productId } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const image = product.image(order);

    if (!image) {
      throw new Error('Image not found');
    }

    await this.cloudinary.deleteImage(image.imageId);

    product.removeImage(order);

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
