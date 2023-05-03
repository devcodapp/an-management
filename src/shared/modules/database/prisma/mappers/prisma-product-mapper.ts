import { Product } from '@modules/product/entities/product';
import { Product as RawProduct } from '@prisma/client';

export class PrismaProductMapper {
  static toPrisma(option: Product) {
    return {
      id: option.id,
      name: option.name,
      description: option.description,
      price: option.price,
      images: [] as any,
      variants: [] as any,
      categoryId: option.categoryId,
      sku: option.sku ?? '',
      createdAt: option.createdAt,
      createdUser: option.createdUser,
      deletedAt: option.deletedAt,
      deletedUser: option.deletedUser,
    };
  }

  static toDomain(raw: RawProduct) {
    return new Product(
      {
        name: raw.name,
        description: raw.description,
        price: raw.price,
        categoryId: raw.categoryId,
        sku: raw.sku,
        // suboptions: raw.suboptions.map((sb: any) => {
        //   return new SubOption({
        //     imageId: sb.imageId?.toString() ?? '',
        //     imageUrl: sb.imageUrl?.toString() ?? '',
        //     name: sb.name?.toString() ?? '',
        //     price: Number(sb.price),
        //     disabledAt: sb.disabledAt
        //       ? new Date(sb.disabledAt?.toLocaleString())
        //       : undefined,
        //   });
        // }),
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
