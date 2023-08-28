import { Injectable } from '@nestjs/common';
import { KafkaService } from '@shared/modules/kafka/kafka.service';

import { CreateRestaurantBody } from '../dtos/create-restaurant.body';
import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';

interface CreateRestaurantResponse {
  restaurant: Restaurant;
}

@Injectable()
export class CreateRestaurant {
  constructor(
    private restaurantsRepository: RestaurantsRepository,
    private readonly kafkaService: KafkaService,
  ) {}

  async execute(
    request: CreateRestaurantBody,
  ): Promise<CreateRestaurantResponse> {
    const restaurant = new Restaurant(request);

    await this.restaurantsRepository.create(restaurant);

    await this.kafkaService.sendMessage('RESTAURANT_CREATED', {
      externalId: restaurant.id,
      name: restaurant.name,
    });

    return {
      restaurant,
    };
  }
}
