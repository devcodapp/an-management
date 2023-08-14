import { Coupon } from '../entities/coupon';
import { CouponFilterInput } from '../interfaces/coupon-filter.input';

export abstract class CouponsRepository {
  abstract create(coupon: Coupon): Promise<void>;

  abstract coupon(couponId: string): Promise<Coupon | null>;

  abstract couponCode(
    code: string,
    restaurantId: string,
  ): Promise<Coupon | null>;

  abstract coupons(filters: CouponFilterInput): Promise<Coupon[] | null>;

  abstract save(coupon: Coupon): Promise<void>;
}
