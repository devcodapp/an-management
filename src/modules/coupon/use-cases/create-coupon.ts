import { Inject, Injectable } from '@nestjs/common';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface CreateCouponRequest {
  title: string;
  description: string;
  code: string;
  discountValue?: number;
  discountPercentage?: number;
  discountLimit?: number;
  expiresIn: Date;
  restaurantId: string;
}

interface CreateCouponResponse {
  coupon: Coupon;
}

@Injectable()
export class CreateCoupon {
  constructor(
    private couponsRepository: CouponsRepository,
    @Inject(REQUEST) private req: Request,
  ) {}
  async execute(request: CreateCouponRequest): Promise<CreateCouponResponse> {
    const coupon = new Coupon(request, { createdUser: this.req['user'].sub });

    await this.couponsRepository.create(coupon);

    return { coupon };
  }
}
