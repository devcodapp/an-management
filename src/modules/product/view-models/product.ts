import { Product, ProductImage } from '@modules/product/entities/product';
import { ICategoryProductView } from '@modules/category-product/view-models/category-product';
import { ProductVariant } from '@modules/product-variant/entities/product-variant';

export class ProductViewModel {
  static toHTTP({
    id,
    name,
    price,
    categoryId,
    images,
    variants,
    Category,
    sku,
  }: Product): IProductView {
    const mappedVariants: any =
      variants?.map(({ id, type, options }) => ({ id, type, options })) ?? [];

    const category = Category
      ? {
          id: Category.id,
          name: Category.name,
          companyId: Category.companyId,
          order: Category.order?.value,
          description: Category.description,
          imageUrl: Category.imageUrl,
          enabled: Category.enabled,
        }
      : undefined;

    return {
      id,
      name,
      price,
      categoryId,
      images,
      variants: mappedVariants,
      category,
      sku,
    };
  }
}

export interface IProductView {
  id: string;
  name: string;
  price: number;
  sku?: string;
  categoryId: string;
  images?: ProductImage[];
  variants: ProductVariant[];
  category?: ICategoryProductView;
}
