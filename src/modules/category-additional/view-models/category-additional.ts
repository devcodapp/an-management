import { CategoryAdditional } from '../entities/category-additional';

export class CategoryAdditionalViewModel {
  static toHTTP({
    id,
    name,
    order,
    companyId,
  }: CategoryAdditional): ICategoryAdditionalView {
    return {
      id,
      name,
      order: order.value,
      companyId,
    };
  }
}

export interface ICategoryAdditionalView {
  id: string;
  name: string;
  order: number;
  companyId: string;
}
