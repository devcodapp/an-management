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
      createdWorker: additional.createdWorker,
      deletedAt: additional.deletedAt,
      deletedWorker: additional.deletedWorker,
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
            createdWorker: rawCategory.createdWorker,
            createdAt: rawCategory.createdAt,
            deletedAt: rawCategory.deletedAt,
            deletedWorker: rawCategory.deletedWorker,
            id: rawCategory.id,
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
        createdWorker: raw.createdWorker,
        deletedAt: raw.deletedAt,
        deletedWorker: raw.deletedWorker,
        id: raw.id,
      },
    );
  }
}
