import { ICategoryAdditionalView } from '@modules/category-additional/view-models/category-additional';
import { Additional } from '../entities/additional';

export class AdditionalViewModel {
  static toHTTP(additional: Additional): IAdditionalView {
    return {
      id: additional.id,
      name: additional.name,
      price: additional.price,
      categoryId: additional.categoryId,
      imageUrl: additional.imageUrl,
      category: additional.Category
        ? {
            id: additional.Category?.id,
            name: additional.Category?.name,
            companyId: additional.Category?.companyId,
            order: additional.Category?.order.value,
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
