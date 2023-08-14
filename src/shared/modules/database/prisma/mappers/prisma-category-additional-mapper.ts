import { CategoryAdditional } from '@modules/category-additional/entities/category-additional';
import { CategoryAdditional as RawCategoryAdditional } from '@prisma/client';
import { Order } from '@shared/entities/order';

export class PrismaCategoryAdditionalMapper {
  static toPrisma(categoryAdditional: CategoryAdditional) {
    return {
      id: categoryAdditional.id,
      name: categoryAdditional.name,
      order: categoryAdditional.order.value,
      restaurantId: categoryAdditional.restaurantId,
      createdAt: categoryAdditional.createdAt,
      createdUser: categoryAdditional.createdUser,
      deletedAt: categoryAdditional.deletedAt,
      deletedUser: categoryAdditional.deletedUser,
      deleted: categoryAdditional.deleted,
    };
  }

  static toDomain(raw: RawCategoryAdditional) {
    return new CategoryAdditional(
      {
        restaurantId: raw.restaurantId,
        name: raw.name,
        order: new Order(raw.order),
      },
      {
        createdAt: raw.createdAt,
        createdUser: raw.createdUser,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
        id: raw.id,
        deleted: raw.deleted,
      },
    );
  }
}
