import { Restaurant } from "@modules/restaurant/entities/restaurant";
import { RestaurantsRepository } from "@modules/restaurant/repositories/restaurant-repository";
import { Injectable } from "@nestjs/common";

import { RestaurantNotFound } from "../errors/restaurant-not-found";

interface RemoveDeliveryFeeRequest {
  restaurantId: string;
  deliveryFeeId: string
}

interface RemoveDeliveryFeeResponse {
  restaurant: Restaurant
}

@Injectable()
export class RemoveDeliveryFee {
  constructor(private restaurantsRepository: RestaurantsRepository) { }

  async execute(request: RemoveDeliveryFeeRequest): Promise<RemoveDeliveryFeeResponse> {
    const { restaurantId, deliveryFeeId } = request

    const restaurant = await this.restaurantsRepository.restaurant(restaurantId)

    if (!restaurant) {
      throw new RestaurantNotFound()
    }

    const deliveryFeeLeft = restaurant.deliveryFees?.filter(fee => fee.id !== deliveryFeeId)

    restaurant.deliveryFees = deliveryFeeLeft

    await this.restaurantsRepository.save(restaurant)

    return { restaurant }
  }
}