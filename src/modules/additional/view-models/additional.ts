import { Additional } from '../entities/additional';

export class AdditionalViewModel {
  static toHTTP(additional: Additional) {
    return {
      id: additional.id,
      name: additional.name,
      price: additional.price,
      categoryId: additional.categoryId,
      imageUrl: additional.imageUrl,
      category: {
        id: additional.Category?.id,
        name: additional.Category?.name,
        companyId: additional.Category?.companyId,
        order: additional.Category?.order.value,
      },
    };
  }
}
