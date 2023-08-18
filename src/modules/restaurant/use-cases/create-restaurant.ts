import { Injectable } from '@nestjs/common';
import { RestaurantsRepository } from '../repositories/restaurant-repository';
import { Restaurant } from '../entities/restaurant';

interface CreateRestaurantRequest {
  name: string;
  description: string;
  tags?: string[];
  type: string;
  ownerId: string;
}

interface CreateRestaurantResponse {
  restaurant: Restaurant;
}

@Injectable()
export class CreateRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(
    request: CreateRestaurantRequest,
  ): Promise<CreateRestaurantResponse> {
    const restaurant = new Restaurant(request);

    await this.restaurantsRepository.create(restaurant);

    return {
      restaurant,
    };
  }
}
