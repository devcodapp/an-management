import { Injectable } from '@nestjs/common';
import { Order } from '@shared/entities/order';
import { CategoryProduct } from '../entities/category-product';
import { CategoryProductsRepository } from '../repositories/category-product-repository';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

interface CreateCategoryProductRequest {
  name: string;
  description: string;
  order: number;
  companyId: string;
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
  ) {}

  async execute(
    request: CreateCategoryProductRequest,
  ): Promise<CreateCategoryProductResponse> {
    const { companyId, name, order, description, image } = request;
    const uploadedImage = await this.cloudinary.uploadImage(image);
    const categoryProduct = new CategoryProduct(
      {
        name,
        description,
        imageId: uploadedImage.public_id,
        imageUrl: uploadedImage.url,
        order: new Order(order),
        companyId,
      },
      { createdUser: '123' },
    );

    await this.categoryProductRepository.create(categoryProduct);

    return {
      categoryProduct,
    };
  }
}
