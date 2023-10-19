import { Inject, Injectable } from "@nestjs/common";
import { RestaurantPaymentCreateBody } from "../dtos/restaurant-payment-create.body";
import { RestaurantPayment } from "../entities/restaurant-payment";
import { RestaurantPaymentRepository } from "../repositories/restaurant-payment-repository";
import { REQUEST } from "@nestjs/core";

interface CreateRestaurantPaymentResponse {
    restaurantPayment: RestaurantPayment
}

@Injectable()
export class CreateRestaurantPayment {
    
    constructor(
        private repository: RestaurantPaymentRepository, @Inject(REQUEST) private req: Request) {}
    
    async execute(request: RestaurantPaymentCreateBody) : Promise<CreateRestaurantPaymentResponse> {

        // const hasRestaurantPayment = await this.repository.restaurantId(request.name, request.restaurantId)

        const { description, name, restaurantId } = request;

        const restaurantPayment = new RestaurantPayment({description, name, restaurantId}, { createdUser: this.req["user"].sub }) 
    
        await this.repository.create(restaurantPayment)

        return { restaurantPayment }
    }
}