import { Injectable } from '@nestjs/common';

import { SaveCouponBody } from '../dtos/save-coupon.body';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';
import { CouponNotFound } from './errors/coupon-not-found';

interface SaveCouponResponse {
  coupon: Coupon;
}

@Injectable()
export class SaveCoupon {
  constructor(private couponsRepository: CouponsRepository) {}
  async execute(request: SaveCouponBody): Promise<SaveCouponResponse> {
    const { couponId, ...updateFields } = request;

    const coupon = await this.couponsRepository.coupon(couponId);

    if (!coupon) {
      throw new CouponNotFound();
    }

    Object.assign(coupon, updateFields);

    await this.couponsRepository.save(coupon);

    return { coupon };
  }
}
