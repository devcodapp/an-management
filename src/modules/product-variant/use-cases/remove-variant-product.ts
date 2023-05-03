import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { Product } from '@modules/product/entities/product';
import { ProductVariantNotFound } from './errors/product-variant-not-found';
import { ProductNotFound } from '@modules/product/use-cases/errors/product-not-found';

interface RemoveVariantProductRequest {
  productId: string;
  variantId: string;
}
interface RemoveVariantProductResponse {
  product: Product;
}

@Injectable()
export class RemoveVariantProduct {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: RemoveVariantProductRequest,
  ): Promise<RemoveVariantProductResponse> {
    const { variantId, productId } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const variant = product.variant(variantId);

    if (!variant) {
      throw new ProductVariantNotFound();
    }

    const images = variant.options
      ?.flatMap((option) => option.images?.map((image) => image.imageId))
      ?.filter((imageId): imageId is string => !!imageId);

    if (images) await this.cloudinary.deleteImages(images);

    product.removeVariant(variantId);

    await this.productsRepository.save(product);

    return {
      product,
    };
  }
}
