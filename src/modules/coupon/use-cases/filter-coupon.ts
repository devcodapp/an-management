import { Injectable } from '@nestjs/common';

import { FilterCouponBody } from '../dtos/filter-coupon.body';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';

interface FilterCouponResponse {
  coupons: Coupon[] | null;
}

@Injectable()
export class FilterCoupon {
  constructor(private couponsRepository: CouponsRepository) {}
  async execute(request: FilterCouponBody): Promise<FilterCouponResponse> {
    const coupons = await this.couponsRepository.coupons(request);

    return { coupons };
  }
}
