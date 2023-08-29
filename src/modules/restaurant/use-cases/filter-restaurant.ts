import { Injectable } from '@nestjs/common';
import { FilterRestaurantBody } from '../dtos/filter-restaurant.body';
import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';

interface FilterRestaurantResponse {
  restaurants: Restaurant[] | null;
}

@Injectable()
export class FilterRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(
    request: FilterRestaurantBody,
  ): Promise<FilterRestaurantResponse> {
    const restaurants = await this.restaurantsRepository.restaurants(request);

    return { restaurants };
  }
}
