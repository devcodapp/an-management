import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { KafkaService } from '@shared/modules/kafka/kafka.service';
import { Request } from 'express';

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
  restaurantId: string;
}

interface CreateCouponResponse {
  coupon: Coupon;
}

@Injectable()
export class CreateCoupon {
  constructor(
    private couponsRepository: CouponsRepository,
    private kafkaService: KafkaService,
    @Inject(REQUEST) private req: Request,
  ) {}
  async execute(request: CreateCouponRequest): Promise<CreateCouponResponse> {

    delete request.discountLimit
    delete request.discountPercentage
    delete request.discountValue
    request.expiresIn = new Date()
    const coupon = new Coupon(request, { createdUser: this.req['user'].sub });


    await this.couponsRepository.create(coupon);

    await this.kafkaService.sendMessage('COUPON_CREATED', {
      externalId: coupon.id,
      restaurantId: coupon.restaurantId,
    });

    return { coupon };
  }
}
