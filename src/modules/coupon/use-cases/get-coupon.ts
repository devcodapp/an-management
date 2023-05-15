import { Injectable } from '@nestjs/common';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';
import { CouponNotFound } from './errors/coupon-not-found';

interface GetCouponRequest {
  couponId: string;
}

interface GetCouponResponse {
  coupon: Coupon;
}

@Injectable()
export class GetCoupon {
  constructor(private couponsRepository: CouponsRepository) {}
  async execute(request: GetCouponRequest): Promise<GetCouponResponse> {
    const { couponId } = request;

    const coupon = await this.couponsRepository.coupon(couponId);

    if (!coupon) {
      throw new CouponNotFound();
    }

    return { coupon };
  }
}
