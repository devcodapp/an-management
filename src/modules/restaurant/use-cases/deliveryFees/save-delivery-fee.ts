import { SaveDeliveryFeeBody } from "@modules/restaurant/dtos/save-delivery-fee.body"
import { DeliveryFee } from "@modules/restaurant/entities/deliveryFee"
import { Restaurant } from "@modules/restaurant/entities/restaurant"
import { RestaurantsRepository } from "@modules/restaurant/repositories/restaurant-repository"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"

import { RestaurantNotFound } from "../errors/restaurant-not-found"

interface SaveOpeningHourResponse {
  restaurant: Restaurant
}

@Injectable()
export class SaveDeliveryFee {
  constructor(private restaurantsRepository: RestaurantsRepository) { }

  async execute(request: SaveDeliveryFeeBody): Promise<SaveOpeningHourResponse> {
    const { restaurantId, deliveryFeeId, ...fields } = request

    const restaurant = await this.restaurantsRepository.restaurant(restaurantId)

    if (!restaurant) {
      throw new RestaurantNotFound()
    }

    const index = restaurant.deliveryFees?.findIndex(deliveryFee => deliveryFee.id === deliveryFeeId)!
    
    if (index < 0) throw new HttpException('Delivery Fee not found', HttpStatus.NOT_FOUND)

    restaurant.deliveryFees?.splice(index, 1)

    const deliveryFee = new DeliveryFee({ id: deliveryFeeId, ...fields })

    restaurant.deliveryFees?.push(deliveryFee)

    await this.restaurantsRepository.save(restaurant)

    return { restaurant }
  }
}