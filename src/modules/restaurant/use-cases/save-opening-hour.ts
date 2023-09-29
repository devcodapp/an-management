import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { SaveOpeningHourBody } from "../dtos/save-opening-hour.body";
import { OpeningHours } from "../entities/openingHours";
import { Restaurant } from "../entities/restaurant";
import { RestaurantsRepository } from "../repositories/restaurant-repository";
import { RestaurantNotFound } from "./errors/restaurant-not-found";

interface SaveOpeningHourResponse {
  restaurant: Restaurant
}

@Injectable()
export class SaveOpeningHour {
  constructor(private restaurantsRepository: RestaurantsRepository) { }

  async execute(request: SaveOpeningHourBody): Promise<SaveOpeningHourResponse> {
    const { restaurantId, openingHourId, ...fields } = request

    const restaurant = await this.restaurantsRepository.restaurant(restaurantId)

    if (!restaurant) {
      throw new RestaurantNotFound()
    }

    const index = restaurant.openingHours?.findIndex(openingHour => openingHour.id === openingHourId)!
    
    if (index < 0) throw new HttpException('Opening Hour not found', HttpStatus.NOT_FOUND)

    restaurant.openingHours?.splice(index, 1)

    const openingHour = new OpeningHours({ id: openingHourId, ...fields })

    restaurant.openingHours?.push(openingHour)

    await this.restaurantsRepository.save(restaurant)

    return { restaurant }
  }
}