import { CategoryProduct } from '../entities/category-product';

export class CategoryProductViewModel {
  static toHTTP({
    id,
    name,
    description,
    imageUrl,
    order,
    enabled,
    restaurantId,
  }: CategoryProduct): ICategoryProductView {
    return {
      id,
      name,
      description,
      imageUrl,
      order: order.value,
      enabled,
      restaurantId,
    };
  }
}

export interface ICategoryProductView {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  order: number;
  enabled?: boolean;
  restaurantId: string;
}
