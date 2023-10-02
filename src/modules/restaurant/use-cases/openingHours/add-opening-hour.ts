import { AddOpeningHourBody } from "@modules/restaurant/dtos/add-opening-hour.body";
import { OpeningHours } from "@modules/restaurant/entities/openingHours";
import { Restaurant } from "@modules/restaurant/entities/restaurant";
import { RestaurantsRepository } from "@modules/restaurant/repositories/restaurant-repository";
import { Injectable } from "@nestjs/common";

import { RestaurantNotFound } from "../errors/restaurant-not-found";

interface AddOpeningHourResponse {
  restaurant: Restaurant
}

@Injectable()
export class AddOpeningHour {
  constructor(private restaurantsRepository: RestaurantsRepository) { }

  async execute(request: AddOpeningHourBody): Promise<AddOpeningHourResponse> {
    const { restaurantId, ...fields } = request

    const restaurant = await this.restaurantsRepository.restaurant(restaurantId)

    if (!restaurant) {
      throw new RestaurantNotFound()
    }

    const openingHour = new OpeningHours(fields)

    restaurant.openingHours?.push(openingHour)

    await this.restaurantsRepository.save(restaurant)

    return { restaurant }
  }
}