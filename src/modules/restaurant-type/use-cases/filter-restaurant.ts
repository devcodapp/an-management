import { Injectable } from '@nestjs/common';
import { RestaurantType } from '../entities/restaurant-type';
import { RestaurantTypesRepository } from '../repositories/restaurant-type-repository';

interface FilterRestaurantTypeResponse {
  restaurantTypes: RestaurantType[] | null;
}

@Injectable()
export class FilterRestaurantType {
  constructor(private restaurantTypesRepository: RestaurantTypesRepository) {}

  async execute(): Promise<FilterRestaurantTypeResponse> {
    const restaurantTypes =
      await this.restaurantTypesRepository.restaurantTypes();

    return { restaurantTypes };
  }
}
