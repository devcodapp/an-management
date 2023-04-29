import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { Product, ProductProps } from '../entities/product';
import { ProductsRepository } from '../repositories/product-repository';
import { Additional } from '@modules/additional/entities/additional';

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  additionals: Additional[];
  options: string;
  inventory: ProductProps['inventory'];
  variants?: ProductProps['variants'];
  categoryId: string;
  category?: string;
  images: Array<Express.Multer.File>;
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
      images: imagesRaw,
      options,
      category,
      inventory,
      variants,
    } = request;

    const images: Product['images'] = [] as Product['images'];
    for (let i = 0; i < imagesRaw.length; i++) {
      const uploadedImage = await this.cloudinary.uploadImage(imagesRaw[i]);
      images.push({
        imageId: uploadedImage.public_id,
        imageUrl: uploadedImage.url,
      });
    }

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
        inventory,
        variants,
      },
      { createdUser: '123' },
    );

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
