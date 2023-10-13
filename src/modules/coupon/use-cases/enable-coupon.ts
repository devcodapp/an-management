import { Injectable } from '@nestjs/common';

import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';

interface EnableCouponRequest {
  couponIds: string[];
}

interface EnableCouponResponse {
  coupons: Coupon[];
}

@Injectable()
export class EnableCoupon {
  constructor(
    private couponsRepository: CouponsRepository,
  ) { }
  async execute(request: EnableCouponRequest): Promise<EnableCouponResponse> {
    const { couponIds } = request;

    const coupons: Coupon[] = []

    for (const id of couponIds) {

      const coupon = await this.couponsRepository.coupon(id);

      if (coupon) {
        coupon.enable();

        await this.couponsRepository.save(coupon);

        coupons.push(coupon)
      }

    }


    return { coupons };
  }
}
