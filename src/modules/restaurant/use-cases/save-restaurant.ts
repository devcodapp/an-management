import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { Address } from '../entities/address';
import { OpeningHours } from '../entities/openingHours';
import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';
import { RestaurantNotFound } from './errors/restaurant-not-found';

interface SaveRestaurantRequest {
  restaurantId: string;
  name?: string;
  description?: string;
  tags?: string[];
  type?: string;
  phoneNumber?: string;
  address?: any;
  openingHours?: any;
}

interface SaveRestaurantResponse {
  restaurant: Restaurant;
}

@Injectable()
export class SaveRestaurant {
  constructor(
    private restaurantsRepository: RestaurantsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: SaveRestaurantRequest,
  ): Promise<SaveRestaurantResponse> {
    const {
      restaurantId,
      address: addressRaw,
      openingHours: openningHoursRaw,
      ...updatedFields
    } = request;

    const restaurant = await this.restaurantsRepository.restaurant(
      restaurantId,
    );

    if (!restaurant) {
      throw new RestaurantNotFound();
    }

    // if (image) {
    //   if (restaurant.imageId) await this.cloudinary.deleteImage(restaurant.imageId);

    //   const { public_id, url } = await this.cloudinary.uploadImage(image);
    //   restaurant.imageId = public_id;
    //   restaurant.imageUrl = url;
    // }

    if (addressRaw) {
      const address = JSON.parse(addressRaw);
      restaurant.address = new Address(address);
    }

    if (openningHoursRaw) {
      const openingHours = JSON.parse(openningHoursRaw);
      restaurant.openingHours = new OpeningHours(openingHours);
    }

    Object.assign(restaurant, updatedFields);

    await this.restaurantsRepository.save(restaurant);

    return { restaurant };
  }
}
