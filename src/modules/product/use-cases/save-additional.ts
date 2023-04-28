import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';
import { ProductNotFound } from './errors/product-not-found';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

interface SaveProductRequest {
  productId: string;
  name?: string;
  price?: number;
  categoryId?: string;
  // image?: Express.Multer.File;
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
    const { productId, categoryId, price, name } = request;

    const product = await this.productRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    // if (image) {
    //   await this.cloudinary.deleteImage(product.imageId);

    //   const uploadedImage = await this.cloudinary.uploadImage(image);
    //   product.imageId = uploadedImage.public_id;
    //   product.imageUrl = uploadedImage.url;
    // }

    name ? (product.name = name) : null;
    categoryId ? (product.categoryId = categoryId) : null;
    price ? (product.price = price) : null;

    await this.productRepository.save(product);

    return { product };
  }
}
