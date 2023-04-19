import { CategoryAdditional } from '../entities/category-additional';

export class CategoryAdditionalViewModel {
  static toHTTP(categoryAdditional: CategoryAdditional) {
    return {
      id: categoryAdditional.id,
      name: categoryAdditional.name,
      order: categoryAdditional.order,
    };
  }
}
