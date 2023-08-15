import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RestaurantType } from '../entities/restaurant-type';
import { RestaurantTypesRepository } from '../repositories/restaurant-type-repository';

interface CreateRestaurantTypeRequest {
  name: string;
}

interface CreateRestaurantTypeResponse {
  restaurantType: RestaurantType;
}

@Injectable()
export class CreateRestaurantType {
  constructor(
    private restaurantsTypeRepository: RestaurantTypesRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: CreateRestaurantTypeRequest,
  ): Promise<CreateRestaurantTypeResponse> {
    const restaurantType = new RestaurantType(request, {
      createdUser: this.req['user'].sub,
    });

    await this.restaurantsTypeRepository.create(restaurantType);

    return {
      restaurantType,
    };
  }
}
