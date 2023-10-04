import { Restaurant } from "@modules/restaurant/entities/restaurant";
import { RestaurantsRepository } from "@modules/restaurant/repositories/restaurant-repository";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { RestaurantNotFound } from "../errors/restaurant-not-found";

interface EnableDeliveryFeeRequest {
  restaurantId: string;
  deliveryFeeId: string
}

interface EnableDeliveryFeeResponse {
  restaurant: Restaurant
}

@Injectable()
export class EnableDeliveryFee {
  constructor(private restaurantsRepository: RestaurantsRepository) { }

  async execute(request: EnableDeliveryFeeRequest): Promise<EnableDeliveryFeeResponse> {
    const { restaurantId, deliveryFeeId } = request

    const restaurant = await this.restaurantsRepository.restaurant(restaurantId)

    if (!restaurant) {
      throw new RestaurantNotFound()
    }

    const index = restaurant.deliveryFees!.findIndex(fee => fee.id !== deliveryFeeId)

    if(index < 0) {
      throw new HttpException('Delivery Fee not found', HttpStatus.NOT_FOUND)
    }

    restaurant.deliveryFees![index].enable()

    await this.restaurantsRepository.save(restaurant)

    return { restaurant }
  }
}