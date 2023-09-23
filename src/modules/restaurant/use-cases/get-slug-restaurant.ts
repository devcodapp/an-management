import { Injectable } from '@nestjs/common';

import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';

interface GetRestaurantRequest {
  slug: string;
}

interface GetRestaurantResponse {
  restaurant: Restaurant | null;
}

@Injectable()
export class GetSlugRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(request: GetRestaurantRequest): Promise<GetRestaurantResponse> {
    const { slug } = request;

    const restaurant = await this.restaurantsRepository.restaurantBySlug(slug);

    return { restaurant };
  }
}
