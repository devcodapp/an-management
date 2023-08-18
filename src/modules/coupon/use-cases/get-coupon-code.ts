import { Injectable } from '@nestjs/common';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';
import { CouponNotFound } from './errors/coupon-not-found';

interface GetCouponCodeRequest {
  code: string;
  restaurantId: string;
}

interface GetCouponCodeResponse {
  coupon: Coupon;
}

@Injectable()
export class GetCouponCode {
  constructor(private couponsRepository: CouponsRepository) {}
  async execute(request: GetCouponCodeRequest): Promise<GetCouponCodeResponse> {
    const { code, restaurantId } = request;

    const coupon = await this.couponsRepository.couponCode(code, restaurantId);

    if (!coupon) {
      throw new CouponNotFound();
    }

    return { coupon };
  }
}
