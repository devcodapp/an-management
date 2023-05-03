import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { ProductNotFound } from '../errors/product-not-found';
import { Product } from '@modules/product/entities/product';
import { ProductVariantNotFound } from './errors/product-variant-not-found';

interface RemoveVariantProductRequest {
  productId: string;
  id: string;
}
interface RemoveVariantProductResponse {
  product: Product;
}

@Injectable()
export class CreateProduct {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: RemoveVariantProductRequest,
  ): Promise<RemoveVariantProductResponse> {
    const { id, productId } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const variant = product.variant(id);

    if (!variant) {
      throw new ProductVariantNotFound();
    }

    const images = variant.options?.flatMap((option) =>
      option.images.map((image) => image.imageId),
    );

    if (images) await this.cloudinary.deleteImages(images);

    product.removeVariant(id);

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
