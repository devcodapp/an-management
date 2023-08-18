import { Injectable } from '@nestjs/common';
import { RestaurantsRepository } from '../repositories/restaurant-repository';
import { RestaurantNotFound } from './errors/restaurant-not-found';

interface CloseRestaurantRequest {
  restaurantId: string;
}

type CloseRestaurantResponse = void;

@Injectable()
export class CloseRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(
    request: CloseRestaurantRequest,
  ): Promise<CloseRestaurantResponse> {
    const { restaurantId } = request;

    const restaurant = await this.restaurantsRepository.restaurant(
      restaurantId,
    );

    if (!restaurant) {
      throw new RestaurantNotFound();
    }

    restaurant.close();

    await this.restaurantsRepository.save(restaurant);
  }
}
