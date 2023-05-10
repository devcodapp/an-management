import { Additional } from '@modules/additional/entities/additional';
import { CategoryAdditional } from '@modules/category-additional/entities/category-additional';
import {
  CategoryAdditional as RawCategoryAdditional,
  Additional as RawAdditional,
} from '@prisma/client';
import { Order } from '@shared/entities/order';
import { PrismaCategoryAdditionalMapper } from './prisma-category-additional-mapper';

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
    return new Additional(
      {
        categoryId: raw.categoryId,
        name: raw.name,
        imageUrl: raw.imageUrl,
        imageId: raw.imageId,
        price: raw.price,
        Category: raw.category
          ? PrismaCategoryAdditionalMapper.toDomain(raw.category)
          : undefined,
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
