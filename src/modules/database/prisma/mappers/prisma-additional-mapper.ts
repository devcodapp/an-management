import { Additional } from '@modules/additional/entities/additional';
import { CategoryAdditional } from '@modules/category-additional/entities/category-additional';
import {
  CategoryAdditional as RawCategoryAdditional,
  Additional as RawAdditional,
} from '@prisma/client';
import { Order } from '@shared/entities/order';

export class PrismaAdditionalMapper {
  static toPrisma(additional: Additional) {
    return {
      id: additional.id,
      name: additional.name,
      imageUrl: additional.imageUrl,
      price: additional.price,
      categoryId: additional.categoryId,
      createdAt: additional.createdAt,
      createdUser: additional.createdUser,
      deletedAt: additional.deletedAt,
      deletedUser: additional.deletedUser,
    };
  }

  static toDomain(raw: RawAdditional & { category?: RawCategoryAdditional }) {
    const { category: rawCategory } = raw;

    const category = rawCategory
      ? new CategoryAdditional(
          {
            companyId: rawCategory?.companyId,
            name: rawCategory?.name,
            order: new Order(rawCategory?.order),
          },
          {
            createdUser: rawCategory.createdUser,
            createdAt: rawCategory.createdAt,
            deletedAt: rawCategory.deletedAt,
            deletedUser: rawCategory.deletedUser,
            id: rawCategory.id,
          },
        )
      : undefined;

    return new Additional(
      {
        categoryId: raw.categoryId,
        name: raw.name,
        imageUrl: raw.imageUrl,
        price: raw.price,
        Category: category,
      },
      {
        createdAt: raw.createdAt,
        createdUser: raw.createdUser,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
        id: raw.id,
      },
    );
  }
}
