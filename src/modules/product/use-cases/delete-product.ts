// import { Injectable } from '@nestjs/common';
// import { ProductsRepository } from '../repositories/product-repository';
// import { Product } from '../entities/product';
// import { ProductNotFound } from './errors/product-not-found';
// interface DeleteProductRequest {
//   productId: string;
// }
// interface DeleteProductResponse {
//   product: Product;
// }

// @Injectable()
// export class DeleteProduct {
//   constructor(private productRepository: ProductsRepository) {}

//   async execute(request: DeleteProductRequest): Promise<DeleteProductResponse> {
//     const { productId } = request;

//     const product = await this.productRepository.product(productId);

//     if (!product) {
//       throw new ProductNotFound();
//     }

//     product.deletedAt = new Date();
//     product.deletedUser = '123';
//     await this.productRepository.save(product);

//     return { product };
//   }
// }
