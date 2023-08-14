import { ICategoryAdditionalView } from '@modules/category-additional/view-models/category-additional';
import { Additional } from '../entities/additional';

export class AdditionalViewModel {
  static toHTTP({
    id,
    name,
    price,
    categoryId,
    imageUrl,
    Category,
  }: Additional): IAdditionalView {
    return {
      id,
      name,
      price,
      categoryId,
      imageUrl,
      category: Category?.id
        ? {
            id: Category?.id,
            name: Category?.name,
            restaurantId: Category?.restaurantId,
            order: Category?.order.value,
          }
        : undefined,
    };
  }
}

export interface IAdditionalView {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  category?: ICategoryAdditionalView;
}
