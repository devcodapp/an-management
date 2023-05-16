import { Inject, Injectable } from '@nestjs/common';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';
import { CouponNotFound } from './errors/coupon-not-found';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface DeleteCouponRequest {
  couponId: string;
}

interface DeleteCouponResponse {
  coupon: Coupon;
}

@Injectable()
export class DeleteCoupon {
  constructor(
    private couponsRepository: CouponsRepository,
    @Inject(REQUEST) private req: Request,
  ) {}
  async execute(request: DeleteCouponRequest): Promise<DeleteCouponResponse> {
    const { couponId } = request;

    const coupon = await this.couponsRepository.coupon(couponId);

    if (!coupon) {
      throw new CouponNotFound();
    }

    coupon.delete(this.req['user'].sub);

    await this.couponsRepository.save(coupon);

    return { coupon };
  }
}
