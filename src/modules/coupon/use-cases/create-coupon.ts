import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { KafkaService } from '@shared/modules/kafka/kafka.service';
import { Request } from 'express';

import { CreateCouponBody } from '../dtos/create-coupon.body';
import { Coupon } from '../entities/coupon';
import { CouponsRepository } from '../repositories/coupon-repository';
import { CouponAlreadExists } from './errors/coupon-alread-exists';

interface CreateCouponResponse {
  coupon: Coupon;
}

@Injectable()
export class CreateCoupon {
  constructor(
    private couponsRepository: CouponsRepository,
    private kafkaService: KafkaService,
    @Inject(REQUEST) private req: Request,
  ) { }
  async execute(request: CreateCouponBody): Promise<CreateCouponResponse> {

    const hasCoupon = await this.couponsRepository.couponCode(request.code, request.restaurantId)

    if(hasCoupon){
      throw new CouponAlreadExists()
    }

    const coupon = new Coupon(request, { createdUser: this.req['user'].sub });

    await this.couponsRepository.create(coupon);

    await this.kafkaService.sendMessage('COUPON_CREATED', {
      externalId: coupon.id,
      restaurantId: coupon.restaurantId,
    });

    return { coupon };
  }
}
