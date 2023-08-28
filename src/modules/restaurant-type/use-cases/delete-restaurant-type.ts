import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RestaurantTypesRepository } from '../repositories/restaurant-type-repository';
import { RestaurantTypeNotFound } from './errors/restaurant-type-not-found';

interface DeleteRestaurantTypeRequest {
  restaurantTypeId: string;
}

@Injectable()
export class DeleteRestaurantType {
  constructor(
    private restaurantTypesRepository: RestaurantTypesRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: DeleteRestaurantTypeRequest,
  ): Promise<void> {
    const { restaurantTypeId } = request;

    const restaurantType = await this.restaurantTypesRepository.restaurantType(
      restaurantTypeId,
    );

    if (!restaurantType) {
      throw new RestaurantTypeNotFound();
    }


    await this.restaurantTypesRepository.delete(restaurantType.id);

  }
}
