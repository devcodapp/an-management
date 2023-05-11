import { Coupon } from '../entities/coupon';
import { CouponFilterInput } from '../interfaces/coupon-filter.input';

export abstract class CompaniesRepository {
  abstract create(coupon: Coupon): Promise<void>;

  abstract coupon(couponId: string): Promise<Coupon | null>;

  abstract companies(filters: CouponFilterInput): Promise<Coupon[] | null>;

  abstract save(coupon: Coupon): Promise<void>;
}
