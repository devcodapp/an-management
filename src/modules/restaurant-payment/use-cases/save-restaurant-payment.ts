import { Injectable } from "@nestjs/common";

import { SaveRestaurantPaymentBody } from "../dtos/save-restaurant-payment.body";
import { RestaurantPayment } from "../entities/restaurant-payment";
import { RestaurantPaymentRepository } from "../repositories/restaurant-payment-repository";
import { RestaurantPaymentNotFound } from "./errors/restaurantPayment-not-found";

interface SaveRestaurantPaymentResponse {
    restaurantPayment: RestaurantPayment;
}

@Injectable()
export class SaveRestaurantPayment {
    constructor(private restaurantPaymentRepository: RestaurantPaymentRepository){}
    async execute(request: SaveRestaurantPaymentBody): Promise<SaveRestaurantPaymentResponse> {
        const { restaurantPaymentId, ...updateFields} = request

        const restaurantPayment = await this.restaurantPaymentRepository.restaurantPayment(restaurantPaymentId)

        if(!restaurantPayment) {
            throw new RestaurantPaymentNotFound()
        }

        Object.assign(restaurantPayment, updateFields)

        await this.restaurantPaymentRepository.save(restaurantPayment)

        return { restaurantPayment }
    }
}