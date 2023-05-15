import { Injectable } from '@nestjs/common';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';
import { CouponNotFound } from './errors/coupon-not-found';

interface SaveCouponRequest {
  couponId: string;
  title?: string;
  description?: string;
  code?: string;
  discountValue?: number;
  discountPercentage?: number;
  discountLimit?: number;
  expiresIn?: Date;
}

interface SaveCouponResponse {
  coupon: Coupon;
}

@Injectable()
export class SaveCoupon {
  constructor(private couponsRepository: CouponsRepository) {}
  async execute(request: SaveCouponRequest): Promise<SaveCouponResponse> {
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
