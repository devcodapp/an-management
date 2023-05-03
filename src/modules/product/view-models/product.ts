import { Product, ProductImage } from '@modules/product/entities/product';
import { ProductVariant } from '../entities/product-variant';
import { ICategoryProductView } from '@modules/category-product/view-models/category-product';

export class ProductViewModel {
  static toHTTP(product: Product): IProductView {
    const variants: any = [];
    product.variants?.map((item) => {
      const variant = {
        id: item.id,
        type: item.type,
        options: item.options,
      };
      variants.push(variant);
    });
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      images: product.images ?? null,
      variants,
      category: product.Category
        ? {
            id: product.Category?.id,
            name: product.Category?.name,
            companyId: product.Category?.companyId,
            order: product.Category?.order.value,
            description: product.Category?.description,
            imageUrl: product.Category?.imageUrl,
            enabled: product.Category?.enabled,
          }
        : undefined,
      sku: product.sku,
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
  sku?: string;
  categoryId: string;
  images: ProductImage[] | null;
  variants: ProductVariant[];
  category?: ICategoryProductView;
  // category?: ICategoryProductView;
}
