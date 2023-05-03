import { OptionVariant } from '@modules/product-variant-option/entities/product-variant-option';
import { ProductVariant } from '@modules/product-variant/entities/product-variant';
import { Product } from '@modules/product/entities/product';
import { Product as RawProduct } from '@prisma/client';

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    const variants: any = product.variants?.map(({ id, options, type }) => ({
      id,
      options: options?.map(({ sku, title, images, disabledAt }) => ({
        sku,
        title,
        images,
        disabledAt,
      })),
      type,
    }));
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
      variants: variants,
      categoryId: product.categoryId,
      sku: product.sku ?? '',
      createdAt: product.createdAt,
      createdUser: product.createdUser,
      deletedAt: product.deletedAt,
      deletedUser: product.deletedUser,
    } as any;
  }

  static toDomain(raw: RawProduct) {
    return new Product(
      {
        name: raw.name,
        description: raw.description,
        price: raw.price,
        categoryId: raw.categoryId,
        sku: raw.sku,
        variants: raw.variants?.map((v: any) => {
          return new ProductVariant({
            type: v.type,
            id: v.id,
            options: v.options?.map((o: any) => {
              return new OptionVariant(o);
            }),
          });
        }),
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
