import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product-repository';
import { Product, ProductProps } from '../entities/product';
import { ProductNotFound } from './errors/product-not-found';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

interface SaveProductRequest {
  productId: string;
  name?: string;
  price?: number;
  categoryId?: string;
  images?: {
    oldImageId: string;
    newImage: Express.Multer.File;
  }[];
  inventory: ProductProps['inventory'];
  variants?: ProductProps['variants'];
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
    const {
      images: imagesRaw,
      productId,
      categoryId,
      price,
      name,
      inventory,
      variants,
    } = request;

    const product = await this.productRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    if (imagesRaw) {
      for (const imageRaw of imagesRaw) {
        await this.cloudinary.deleteImage(imageRaw.oldImageId);
        const uploadedImage = await this.cloudinary.uploadImage(
          imageRaw.newImage,
        );

        product.images = product.images.map((item) => {
          if (item.imageId === imageRaw.oldImageId) {
            return {
              imageId: uploadedImage.public_id,
              imageUrl: uploadedImage.url,
            };
          }
          return item;
        });
      }
    }

    name ? (product.name = name) : null;
    categoryId ? (product.categoryId = categoryId) : null;
    price ? (product.price = price) : null;
    inventory ? (product.inventory = inventory) : null;
    variants ? (product.variants = variants) : null;

    await this.productRepository.save(product);

    return { product };
  }
}
