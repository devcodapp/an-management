import { Inject, Injectable } from '@nestjs/common';
import { Order } from '@shared/entities/order';
import { CategoryProduct } from '../entities/category-product';
import { CategoryProductsRepository } from '../repositories/category-product-repository';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface CreateCategoryProductRequest {
  name: string;
  description: string;
  order: number;
  restaurantId: string;
  image: Express.Multer.File;
}
interface CreateCategoryProductResponse {
  categoryProduct: CategoryProduct;
}

@Injectable()
export class CreateCategoryProduct {
  constructor(
    private categoryProductRepository: CategoryProductsRepository,
    private cloudinary: CloudinaryService,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: CreateCategoryProductRequest,
  ): Promise<CreateCategoryProductResponse> {
    const { restaurantId, name, order, description, image } = request;
    const uploadedImage = await this.cloudinary.uploadImage(image);
    const categoryProduct = new CategoryProduct(
      {
        name,
        description,
        imageId: uploadedImage.public_id,
        imageUrl: uploadedImage.url,
        order: new Order(Number(order)),
        restaurantId,
      },
      { createdUser: this.req['user'].sub },
    );

    await this.categoryProductRepository.create(categoryProduct);

    return {
      categoryProduct,
    };
  }
}
