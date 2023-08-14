import { CategoryAdditional } from '../entities/category-additional';

export class CategoryAdditionalViewModel {
  static toHTTP({
    id,
    name,
    order,
    restaurantId,
  }: CategoryAdditional): ICategoryAdditionalView {
    return {
      id,
      name,
      order: order.value,
      restaurantId,
    };
  }
}

export interface ICategoryAdditionalView {
  id: string;
  name: string;
  order: number;
  restaurantId: string;
}
