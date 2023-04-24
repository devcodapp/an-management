import { CategoryAdditional } from '../entities/category-additional';

export class CategoryAdditionalViewModel {
  static toHTTP(
    categoryAdditional: CategoryAdditional,
  ): ICategoryAdditionalView {
    return {
      id: categoryAdditional.id,
      name: categoryAdditional.name,
      order: categoryAdditional.order.value,
      companyId: categoryAdditional.companyId,
    };
  }
}

export interface ICategoryAdditionalView {
  id: string;
  name: string;
  order: number;
  companyId: string;
}
