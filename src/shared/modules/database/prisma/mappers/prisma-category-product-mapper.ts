import { CategoryProduct } from '@modules/category-product/entities/category-product';
import { CategoryProduct as RawCategoryProduct } from '@prisma/client';
import { Order } from '@shared/entities/order';

export class PrismaCategoryProductMapper {
  static toPrisma(categoryProduct: CategoryProduct) {
    return {
      id: categoryProduct.id,
      name: categoryProduct.name,
      description: categoryProduct.description,
      order: categoryProduct.order.value,
      imageId: categoryProduct.imageId,
      imageUrl: categoryProduct.imageUrl,
      createdUser: categoryProduct.createdUser,
      createdAt: categoryProduct.createdAt,
      deletedUser: categoryProduct.deletedUser,
      deletedAt: categoryProduct.deletedAt,
      companyId: categoryProduct.companyId,
    };
  }

  static toDomain(raw: RawCategoryProduct) {
    return new CategoryProduct(
      {
        companyId: raw.companyId,
        description: raw.description,
        imageId: raw.imageId,
        imageUrl: raw.imageUrl,
        name: raw.name,
        order: new Order(raw.order),
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
