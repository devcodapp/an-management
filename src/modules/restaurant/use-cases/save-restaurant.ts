import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { SaveRestaurantBody } from '../dtos/save-restaurant.body';
import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';
import { RestaurantNotFound } from './errors/restaurant-not-found';

interface SaveRestaurantResponse {
  restaurant: Restaurant;
}

@Injectable()
export class SaveRestaurant {
  constructor(
    private restaurantsRepository: RestaurantsRepository,
    private cloudinary: CloudinaryService,
  ) { }

  async execute(
    request: SaveRestaurantBody,
  ): Promise<SaveRestaurantResponse> {
    const {
      restaurantId,
      ...updatedFields
    } = request;

    const restaurant = await this.restaurantsRepository.restaurant(
      restaurantId,
    );

    if (!restaurant) {
      throw new RestaurantNotFound();
    }
    
    Object.assign(restaurant, updatedFields);

    await this.restaurantsRepository.save(restaurant);

    return { restaurant };
  }
}
