import { Inject, Injectable } from '@nestjs/common';
import { RestaurantType } from '../entities/restaurant-type';
import { RestaurantTypesRepository } from '../repositories/restaurant-type-repository';
import { RestaurantTypeNotFound } from './errors/restaurant-type-not-found';
import { REQUEST } from '@nestjs/core';

interface DeleteRestaurantTypeRequest {
  restaurantTypeId: string;
}
interface DeleteRestaurantTypeResponse {
  restaurantType: RestaurantType;
}

@Injectable()
export class DeleteRestaurantType {
  constructor(
    private restaurantTypesRepository: RestaurantTypesRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: DeleteRestaurantTypeRequest,
  ): Promise<DeleteRestaurantTypeResponse> {
    const { restaurantTypeId } = request;

    const restaurantType = await this.restaurantTypesRepository.restaurantType(
      restaurantTypeId,
    );

    if (!restaurantType) {
      throw new RestaurantTypeNotFound();
    }

    restaurantType.delete(this.req['user'].sub);

    await this.restaurantTypesRepository.save(restaurantType);

    return { restaurantType };
  }
}
