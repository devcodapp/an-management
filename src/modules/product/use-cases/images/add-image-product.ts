import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { ProductNotFound } from '../errors/product-not-found';

interface AddImageProductRequest {
  productId: string;
  image: Express.Multer.File;
  order: number;
}
interface AddImageProductResponse {
  product: Product;
}

@Injectable()
export class CreateProduct {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: AddImageProductRequest,
  ): Promise<AddImageProductResponse> {
    const { image, order, productId } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const { public_id, url } = await this.cloudinary.uploadImage(image);

    const hasImageInOrder = product.image(order);
    if (hasImageInOrder) {
      product.removeImage(order);
    }

    product.addImage({ imageId: public_id, imageUrl: url, order });

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
