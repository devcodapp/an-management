import { AddDeliveryFeeBody } from "@modules/restaurant/dtos/add-delivery-fee.body";
import { DeliveryFee } from "@modules/restaurant/entities/deliveryFee";
import { Restaurant } from "@modules/restaurant/entities/restaurant";
import { RestaurantsRepository } from "@modules/restaurant/repositories/restaurant-repository";
import { Injectable } from "@nestjs/common";

import { RestaurantNotFound } from "../errors/restaurant-not-found";

interface AddDeliveryFeeResponse {
  restaurant: Restaurant
}

@Injectable()
export class AddDeliveryFee {
  constructor(private restaurantsRepository: RestaurantsRepository) { }

  async execute(request: AddDeliveryFeeBody): Promise<AddDeliveryFeeResponse> {
    const { restaurantId, ...fields } = request

    const restaurant = await this.restaurantsRepository.restaurant(restaurantId)

    if (!restaurant) {
      throw new RestaurantNotFound()
    }

    const deliveryFee = new DeliveryFee(fields)

    restaurant.deliveryFees?.push(deliveryFee)

    await this.restaurantsRepository.save(restaurant)

    return { restaurant }
  }
}