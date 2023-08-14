import { Injectable } from '@nestjs/common';
import { RestaurantsRepository } from '../repositories/restaurant-repository';
import { RestaurantNotFound } from './errors/restaurant-not-found';

interface OpenRestaurantRequest {
  restaurantId: string;
}

type OpenRestaurantResponse = void;

@Injectable()
export class OpenRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(
    request: OpenRestaurantRequest,
  ): Promise<OpenRestaurantResponse> {
    const { restaurantId } = request;

    const restaurant = await this.restaurantsRepository.restaurant(
      restaurantId,
    );

    if (!restaurant) {
      throw new RestaurantNotFound();
    }

    restaurant.open();

    await this.restaurantsRepository.save(restaurant);
  }
}
