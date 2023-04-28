import { Product } from '@modules/product/entities/product';

export class ProductViewModel {
  static toHTTP(product: Product): IProductView {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      imageUrl: '',
      // imageUrl: product.imageUrl,
      // category: product.Category
      //   ? {
      //       id: product.Category?.id,
      //       name: product.Category?.name,
      //       companyId: product.Category?.companyId,
      //       order: product.Category?.order.value,
      //     }
      //   : undefined,
    };
  }
}

export interface IProductView {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  // category?: ICategoryProductView;
}
