import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { ProductNotFound } from '../errors/product-not-found';
import {
  ProductVariant,
  VariantTypes,
} from '@modules/product/entities/product-variant';

interface AddVariantProductRequest {
  productId: string;
  type: VariantTypes;
}
interface AddVariantProductResponse {
  product: Product;
}

@Injectable()
export class CreateProduct {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: AddVariantProductRequest,
  ): Promise<AddVariantProductResponse> {
    const { type, productId } = request;

    const product = await this.productsRepository.product(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const variant = new ProductVariant({ type });

    product.addVariant(variant);

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
