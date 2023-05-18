import { Injectable } from '@nestjs/common';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';

interface FilterCouponRequest {
  title?: string;
  description?: string;
  code?: string;
  expired?: boolean;
  companyId: string;
  deleted?: boolean;
}

interface FilterCouponResponse {
  coupons: Coupon[] | null;
}

@Injectable()
export class FilterCoupon {
  constructor(private couponsRepository: CouponsRepository) {}
  async execute(request: FilterCouponRequest): Promise<FilterCouponResponse> {
    const coupons = await this.couponsRepository.coupons(request);

    return { coupons };
  }
}
