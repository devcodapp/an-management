import { Injectable } from '@nestjs/common';
import { Order } from '@shared/entities/order';
import { CategoryProduct } from '../entities/category-product';
import { CategoryProductsRepository } from '../repositories/category-product-repository';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { CategoryProductNotFound } from './errors/category-product-not-found';

interface SaveCategoryProductRequest {
  categoryProductId: string;
  name?: string;
  description?: string;
  order?: number;
  image?: Express.Multer.File;
}
interface SaveCategoryProductResponse {
  categoryProduct: CategoryProduct;
}

@Injectable()
export class SaveCategoryProduct {
  constructor(
    private categoryProductRepository: CategoryProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: SaveCategoryProductRequest,
  ): Promise<SaveCategoryProductResponse> {
    const { categoryProductId, name, order, description, image } = request;

    const categoryProduct =
      await this.categoryProductRepository.categoryProduct(categoryProductId);

    if (!categoryProduct) {
      throw new CategoryProductNotFound();
    }

    if (image) {
      await this.cloudinary.deleteImage(categoryProduct.imageId);

      const uploadedImage = await this.cloudinary.uploadImage(image);
      categoryProduct.imageId = uploadedImage.public_id;
      categoryProduct.imageUrl = uploadedImage.url;
    }

    name ? (categoryProduct.name = name) : null;
    description ? (categoryProduct.description = description) : null;
    order ? (categoryProduct.order = new Order(order)) : null;

    await this.categoryProductRepository.save(categoryProduct);

    return { categoryProduct };
  }
}
