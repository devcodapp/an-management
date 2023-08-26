import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { KafkaService } from '@shared/modules/kafka/kafka.service';
import { Request } from 'express';

import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';
import { CouponNotFound } from './errors/coupon-not-found';

interface RecoverCouponRequest {
  couponId: string;
}

interface RecoverCouponResponse {
  coupon: Coupon;
}

@Injectable()
export class RecoverCoupon {
  constructor(
    private couponsRepository: CouponsRepository,
    private kafkaService: KafkaService,
    @Inject(REQUEST) private req: Request,
  ) {}
  async execute(request: RecoverCouponRequest): Promise<RecoverCouponResponse> {
    const { couponId } = request;

    const coupon = await this.couponsRepository.coupon(couponId);

    if (!coupon) {
      throw new CouponNotFound();
    }

    coupon.recover();

    await this.couponsRepository.save(coupon);

    await this.kafkaService.sendMessage('COUPON_CREATED', {
      externalId: coupon.id,
      restaurantId: coupon.restaurantId,
    });

    return { coupon };
  }
}
