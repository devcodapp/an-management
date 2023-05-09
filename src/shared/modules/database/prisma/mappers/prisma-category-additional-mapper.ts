import { CategoryAdditional } from '@modules/category-additional/entities/category-additional';
import { CategoryAdditional as RawCategoryAdditional } from '@prisma/client';
import { Order } from '@shared/entities/order';

export class PrismaCategoryAdditionalMapper {
  static toPrisma(categoryAdditional: CategoryAdditional) {
    return {
      id: categoryAdditional.id,
      name: categoryAdditional.name,
      order: categoryAdditional.order.value,
      companyId: categoryAdditional.companyId,
      createdAt: categoryAdditional.createdAt,
      createdWorker: categoryAdditional.createdWorker,
      deletedAt: categoryAdditional.deletedAt,
      deletedWorker: categoryAdditional.deletedWorker,
    };
  }

  static toDomain(raw: RawCategoryAdditional) {
    return new CategoryAdditional(
      {
        companyId: raw.companyId,
        name: raw.name,
        order: new Order(raw.order),
      },
      {
        createdAt: raw.createdAt,
        createdWorker: raw.createdWorker,
        deletedAt: raw.deletedAt,
        deletedWorker: raw.deletedWorker,
        id: raw.id,
      },
    );
  }
}
