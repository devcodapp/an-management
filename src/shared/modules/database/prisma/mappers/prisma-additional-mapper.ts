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
      imageId: additional.imageId,
      price: additional.price,
      categoryId: additional.categoryId,
      createdAt: additional.createdAt,
      createdUser: additional.createdUser,
      deletedAt: additional.deletedAt,
      deletedUser: additional.deletedUser,
    };
  }

  static toDomain(raw: RawAdditional & { category?: RawCategoryAdditional }) {
    const category = raw.category
      ? new CategoryAdditional(
          {
            companyId: raw.category?.companyId,
            name: raw.category?.name,
            order: new Order(raw.category?.order),
          },
          {
            createdUser: raw.category.createdUser,
            createdAt: raw.category.createdAt,
            deletedAt: raw.category.deletedAt,
            deletedUser: raw.category.deletedUser,
            id: raw.category.id,
          },
        )
      : undefined;

    return new Additional(
      {
        categoryId: raw.categoryId,
        name: raw.name,
        imageUrl: raw.imageUrl,
        imageId: raw.imageId,
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
