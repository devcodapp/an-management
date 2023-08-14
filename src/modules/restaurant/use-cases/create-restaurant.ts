import { Injectable } from '@nestjs/common';
import { RestaurantsRepository } from '../repositories/restaurant-repository';
import { Restaurant } from '../entities/restaurant';

interface CreateRestaurantRequest {
  name: string;
  description: string;
  tags: string[];
  type: string;
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
    const { description, name, tags, type } = request;

    const restaurant = new Restaurant({
      description,
      name,
      tags,
      type,
    });

    await this.restaurantsRepository.create(restaurant);

    return {
      restaurant,
    };
  }
}
