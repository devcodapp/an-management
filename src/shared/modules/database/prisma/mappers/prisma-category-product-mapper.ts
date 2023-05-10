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
      createdWorker: categoryProduct.createdWorker,
      createdAt: categoryProduct.createdAt,
      deletedWorker: categoryProduct.deletedWorker,
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
        createdWorker: raw.createdWorker,
        deletedAt: raw.deletedAt,
        deletedWorker: raw.deletedWorker,
        id: raw.id,
      },
    );
  }
}
