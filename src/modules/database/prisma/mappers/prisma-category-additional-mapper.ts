import { CategoryAdditional } from '@modules/category-additional/entities/category-additional';
import { CategoryAdditional as RawCategoryAdditional } from '@prisma/client';

export class PrismaCategoryAdditionalMapper {
  static toPrisma(categoryAdditional: CategoryAdditional) {
    return {
      id: categoryAdditional.id,
      name: categoryAdditional.name,
      order: categoryAdditional.order,
      companyId: categoryAdditional.companyId,
      createdAt: categoryAdditional.createdAt,
      createdUser: categoryAdditional.createdUser,
      deletedAt: categoryAdditional.deletedAt,
      deletedUser: categoryAdditional.deletedUser,
    };
  }

  static toDomain(raw: RawCategoryAdditional) {
    return new CategoryAdditional(
      {
        companyId: raw.companyId,
        name: raw.name,
        order: raw.order,
      },
      {
        createdAt: raw.createdAt,
        createdUser: raw.createdUser,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
      },
    );
  }
}
