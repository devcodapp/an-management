import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { Product } from '../entities/product';
import { ProductsRepository } from '../repositories/product-repository';
import { Additional } from '@modules/additional/entities/additional';

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  additionals: Additional[];
  options: string;
  images: {
    imageUrl: string;
    imageId: string;
  }[];
  categoryId: string;
  category?: string;
  // image: Express.Multer.File;
}
interface CreateProductResponse {
  product: Product;
}

@Injectable()
export class CreateProduct {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const {
      categoryId,
      name,
      price,
      additionals,
      description,
      images,
      options,
      category,
    } = request;
    // const uploadedImage = await this.cloudinary.uploadImage(image);
    const product = new Product(
      {
        name,
        categoryId,
        price: Number(price),
        additionals,
        description,
        images,
        options,
        category,
      },
      { createdUser: '123' },
    );

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
