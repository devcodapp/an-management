import { Injectable } from '@nestjs/common';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';

interface CreateCouponRequest {
  title: string;
  description: string;
  code: string;
  discountValue?: number;
  discountPercentage?: number;
  discountLimit?: number;
  expiresIn: Date;
  companyId: string;
}

interface CreateCouponResponse {
  coupon: Coupon;
}

@Injectable()
export class CreateCoupon {
  constructor(private couponsRepository: CouponsRepository) {}
  async execute(request: CreateCouponRequest): Promise<CreateCouponResponse> {
    const coupon = new Coupon(request, { createdUser: '123' });

    await this.couponsRepository.create(coupon);

    return { coupon };
  }
}
