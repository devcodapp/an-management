import { Product, ProductImage } from '@modules/product/entities/product';
import { ICategoryProductView } from '@modules/category-product/view-models/category-product';
import { ProductVariant } from '@modules/product-variant/entities/product-variant';
import { IAdditionalView } from '@modules/additional/view-models/additional';

export class ProductViewModel {
  static toHTTP({
    id,
    name,
    price,
    categoryId,
    images,
    variants,
    category,
    additionals,
    sku,
  }: Product): IProductView {
    const mappedVariants: any =
      variants?.map(({ id, type, options }) => ({
        id,
        type,
        options: options?.map(({ sku, title, images }) => ({
          sku,
          title,
          images,
        })),
      })) ?? [];

    const categoryRaw = category
      ? {
          id: category.id,
          name: category.name,
          restaurantId: category.restaurantId,
          order: category.order?.value,
          description: category.description,
          imageUrl: category.imageUrl,
          enabled: category.enabled,
        }
      : undefined;
    const additionalsRaw: any = additionals?.map(
      ({ imageUrl, name, price, deletedAt, imageId, id }) => ({
        imageUrl,
        name,
        price,
        deletedAt,
        imageId,
        id,
      }),
    );

    return {
      id,
      name,
      price,
      categoryId,
      images,
      variants: mappedVariants,
      category: categoryRaw,
      sku,
      additionals: additionalsRaw,
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
  additionals?: IAdditionalView[];
}
