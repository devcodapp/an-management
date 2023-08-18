import { Injectable } from '@nestjs/common';
import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';

interface GetRestaurantRequest {
  id: string;
}

interface GetRestaurantResponse {
  restaurant: Restaurant | null;
}

@Injectable()
export class GetRestaurant {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(request: GetRestaurantRequest): Promise<GetRestaurantResponse> {
    const { id } = request;

    const restaurant = await this.restaurantsRepository.restaurant(id);

    return { restaurant };
  }
}
