import { Injectable } from "@nestjs/common";
import { RestaurantPayment } from "../entities/restaurant-payment";
import { RestaurantPaymentRepository } from "../repositories/restaurant-payment-repository";
import { RestaurantPaymentNotFound } from "./errors/restaurantPayment-not-found";

interface GetRestaurantPaymentRequest {
    restaurantPaymentId: string;
}

interface GetRestaurantPaymentResponse {
    restaurantPayment: RestaurantPayment;
}

@Injectable()
export class GetRestaurantPayment {
    constructor(private restaurantPaymentRepository: RestaurantPaymentRepository) {}
    async execute(request: GetRestaurantPaymentRequest): Promise<GetRestaurantPaymentResponse> {
        const { restaurantPaymentId } = request

        const restaurantPayment = await this.restaurantPaymentRepository.restaurantPayment(restaurantPaymentId)
    
        if(!restaurantPayment) {
            throw new RestaurantPaymentNotFound()
        }

        return { restaurantPayment }
    }
}