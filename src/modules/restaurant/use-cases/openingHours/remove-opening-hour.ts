import { Restaurant } from "@modules/restaurant/entities/restaurant";
import { RestaurantsRepository } from "@modules/restaurant/repositories/restaurant-repository";
import { Injectable } from "@nestjs/common";

import { RestaurantNotFound } from "../errors/restaurant-not-found";

interface RemoveOpeningHourRequest {
  restaurantId: string;
  openingHourId: string
}

interface RemoveOpeningHourResponse {
  restaurant: Restaurant
}

@Injectable()
export class RemoveOpeningHour {
  constructor(private restaurantsRepository: RestaurantsRepository) { }

  async execute(request: RemoveOpeningHourRequest): Promise<RemoveOpeningHourResponse> {
    const { restaurantId, openingHourId } = request

    const restaurant = await this.restaurantsRepository.restaurant(restaurantId)

    if (!restaurant) {
      throw new RestaurantNotFound()
    }

    console.log(restaurant.openingHours, openingHourId)

    const openingHoursLeft = restaurant.openingHours?.filter(open => open.id !== openingHourId)
    

    restaurant.openingHours = openingHoursLeft

    await this.restaurantsRepository.save(restaurant)

    return { restaurant }
  }
}