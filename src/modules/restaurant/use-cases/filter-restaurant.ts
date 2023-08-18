import { Injectable } from '@nestjs/common';
import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';

interface FilterRestaurantRequest {
  name?: string;
  tags?: string[];
  type?: string;
}

interface FilterRestaurantResponse {
  restaurants: Restaurant[] | null;
}

@Injectable()
export class FilterRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(
    request: FilterRestaurantRequest,
  ): Promise<FilterRestaurantResponse> {
    const restaurants = await this.restaurantsRepository.restaurants(request);

    return { restaurants };
  }
}
