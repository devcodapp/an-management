import { Injectable } from '@nestjs/common';

import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';

interface DisableCouponRequest {
  couponIds: string[];
}

interface DisableCouponResponse {
  coupons: Coupon[];
}

@Injectable()
export class DisableCoupon {
  constructor(
    private couponsRepository: CouponsRepository,
  ) { }
  async execute(request: DisableCouponRequest): Promise<DisableCouponResponse> {
    const { couponIds } = request;

    const coupons: Coupon[] = []

    for (const id of couponIds) {

      const coupon = await this.couponsRepository.coupon(id);

      if (coupon) {
        coupon.disable();

        await this.couponsRepository.save(coupon);

        coupons.push(coupon)
      }

    }


    return { coupons };
  }
}
