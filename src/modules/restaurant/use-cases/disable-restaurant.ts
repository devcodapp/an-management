import { Injectable } from '@nestjs/common';
import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';
import { RestaurantNotFound } from './errors/restaurant-not-found';

interface DisableRestaurantRequest {
  restaurantId: string;
}
interface DisableRestaurantResponse {
  restaurant: Restaurant;
}

@Injectable()
export class DisableRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(
    request: DisableRestaurantRequest,
  ): Promise<DisableRestaurantResponse> {
    const { restaurantId } = request;

    const restaurant = await this.restaurantsRepository.restaurant(
      restaurantId,
    );

    if (!restaurant) {
      throw new RestaurantNotFound();
    }

    restaurant.disabledAt = new Date();

    await this.restaurantsRepository.save(restaurant);

    return { restaurant };
  }
}
