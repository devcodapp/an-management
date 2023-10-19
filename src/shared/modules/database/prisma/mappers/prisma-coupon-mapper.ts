import { Coupon } from '@modules/coupon/entities/coupon';
import { Coupon as RawCoupon } from '@prisma/client';

export class PrismaCouponMapper {
  static toPrisma(coupon: Coupon) {
    return {
      id: coupon.id,
      title: coupon.title,
      description: coupon.description,
      code: coupon.code,
      discountValue: coupon.discountValue,
      discountPercentage: coupon.discountPercentage,
      singleUse: coupon.singleUse,
      discountLimit: coupon.discountLimit,
      expiresIn: coupon.expiresIn,
      initiateIn: coupon.initiateIn,
      disabled: coupon.disabled,
      createdUser: coupon.createdUser,
      createdAt: coupon.createdAt,
      deletedUser: coupon.deletedUser,
      deletedAt: coupon.deletedAt,
      restaurantId: coupon.restaurantId,
      deleted: coupon.deleted,
    };
  }

  static toDomain(raw: RawCoupon) {
    return new Coupon(
      {
        restaurantId: raw.restaurantId,
        description: raw.description,
        code: raw.code,
        discountValue: raw.discountValue ?? undefined,
        discountLimit: raw.discountLimit ?? undefined,
        discountPercentage: raw.discountPercentage ?? undefined,
        expiresIn: raw.expiresIn || undefined,
        singleUse: raw.singleUse,
        title: raw.title,
        initiateIn: raw.initiateIn ||undefined
      },
      {
        createdAt: raw.createdAt,
        createdUser: raw.createdUser,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
        id: raw.id,
        deleted: raw.deleted,
        disabled: raw.disabled
      },
    );
  }
}
