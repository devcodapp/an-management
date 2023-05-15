import { Coupon } from '@modules/coupon/entities/coupon';
import { Coupon as RawCoupon } from '@prisma/client';
import { Order } from '@shared/entities/order';

export class PrismaCouponMapper {
  static toPrisma(categoryProduct: Coupon) {
    return {
      id: categoryProduct.id,
      title: categoryProduct.title,
      description: categoryProduct.description,
      code: categoryProduct.code,
      discountValue: categoryProduct.discountValue,
      discountPercentage: categoryProduct.discountPercentage,
      discountLimit: categoryProduct.discountLimit,
      expiresIn: categoryProduct.expiresIn,
      createdUser: categoryProduct.createdUser,
      createdAt: categoryProduct.createdAt,
      deletedUser: categoryProduct.deletedUser,
      deletedAt: categoryProduct.deletedAt,
      companyId: categoryProduct.companyId,
    };
  }

  static toDomain(raw: RawCoupon) {
    return new Coupon(
      {
        companyId: raw.companyId,
        description: raw.description,
        code: raw.code,
        discountValue: raw.discountValue ?? undefined,
        discountLimit: raw.discountLimit ?? undefined,
        discountPercentage: raw.discountPercentage ?? undefined,
        expiresIn: raw.expiresIn,
        title: raw.title,
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