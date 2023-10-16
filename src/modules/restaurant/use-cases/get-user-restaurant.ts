import { Injectable } from '@nestjs/common';

import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';

interface GetUserRestaurantRequest {
  userId: string;
}

interface GetUserRestaurantResponse {
  restaurants: Restaurant[];
}

@Injectable()
export class GetUserRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) { }

  async execute(request: GetUserRestaurantRequest): Promise<GetUserRestaurantResponse> {
    const { userId } = request;

    const restaurants = await this.restaurantsRepository.restaurantsByUser(userId);

    return { restaurants };
  }
}
