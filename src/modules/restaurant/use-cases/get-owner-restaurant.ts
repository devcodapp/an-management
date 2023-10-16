import { Injectable } from '@nestjs/common';

import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';

interface GetOwnerRestaurantRequest {
  ownerId: string;
}

interface GetOwnerRestaurantResponse {
  restaurants: Restaurant[];
}

@Injectable()
export class GetOwnerRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(request: GetOwnerRestaurantRequest): Promise<GetOwnerRestaurantResponse> {
    const { ownerId } = request;

    const restaurants = await this.restaurantsRepository.restaurantsByOwner(ownerId);

    return { restaurants };
  }
}
