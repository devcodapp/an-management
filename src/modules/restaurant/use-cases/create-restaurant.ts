import { Injectable } from '@nestjs/common';
import { KafkaService } from '@shared/modules/kafka/kafka.service';

import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';

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
  constructor(
    private restaurantsRepository: RestaurantsRepository,
    private readonly kafkaService: KafkaService,
  ) {}

  async execute(
    request: CreateRestaurantRequest,
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
