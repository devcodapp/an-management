import { PaginationProps } from '@shared/dtos/pagination-body';

import { FilterCouponBody } from '../dtos/filter-coupon.body';
import { Coupon, CouponPaginated } from '../entities/coupon';

export abstract class CouponsRepository {
  abstract create(coupon: Coupon): Promise<void>;

  abstract coupon(couponId: string): Promise<Coupon | null>;

  abstract couponCode(
    code: string,
    restaurantId: string,
  ): Promise<Coupon | null>;

  abstract coupons(filters: FilterCouponBody): Promise<Coupon[] | null>;

  abstract couponsPagination(
    filters: FilterCouponBody,
    pagination: PaginationProps
  ): Promise<CouponPaginated>;

  abstract save(coupon: Coupon): Promise<void>;
}
