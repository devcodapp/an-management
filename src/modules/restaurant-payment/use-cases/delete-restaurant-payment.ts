import {Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
// import { KafkaService } from '@shared/modules/kafka/kafka.service';
import { Request } from 'express';

import { RestaurantPayment } from '../entities/restaurant-payment';
import { RestaurantPaymentRepository } from '../repositories/restaurant-payment-repository';
import { RestaurantPaymentNotFound } from './errors/restaurantPayment-not-found';

interface DeleteRestaurantPaymentRequest {
    restaurantPaymentId: string;
}

interface DeleteRestaurantPaymentReponse {
    restaurantPayment: RestaurantPayment
}

@Injectable()
export class DeleteRestaurantPayment {
    constructor(
        private restaurantPaymentRepository: RestaurantPaymentRepository,
        @Inject(REQUEST) private req: Request,
    ) {}
    async execute(request: DeleteRestaurantPaymentRequest): Promise<DeleteRestaurantPaymentReponse> {
        const { restaurantPaymentId } = request;

        const restaurantPayment = await this.restaurantPaymentRepository.restaurantPayment(restaurantPaymentId)

        if(!restaurantPayment) {
            throw new RestaurantPaymentNotFound()
        }

        restaurantPayment.delete(this.req['user'].sub);

        await this.restaurantPaymentRepository.save(restaurantPayment)

        return { restaurantPayment }
    }
}