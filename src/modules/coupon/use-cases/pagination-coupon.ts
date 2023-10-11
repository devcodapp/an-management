import { Injectable } from "@nestjs/common";
import { PaginationProps } from "@shared/dtos/pagination-body";

import { FilterCouponBody } from "../dtos/filter-coupon.body";
import { CouponPaginated } from "../entities/coupon";
import { CouponsRepository } from "../repositories/coupon-repository";

@Injectable()
export class PaginationCoupon {
  constructor(private couponRepository: CouponsRepository) { }

  async execute(request: FilterCouponBody, pagination: PaginationProps): Promise<CouponPaginated> {
    const coupons = await this.couponRepository.couponsPagination(request, pagination)

    return coupons
  }
}