import { Injectable } from '@nestjs/common';
import { Restaurant } from '../entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurant-repository';
import { RestaurantNotFound } from './errors/restaurant-not-found';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { Address } from '../entities/address';

interface SaveRestaurantRequest {
  restaurantId: string;
  name?: string;
  description?: string;
  tags?: string[];
  type?: string;
  address?: any;
  openAt: string;
  closeAt: string;
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
      description,
      name,
      tags,
      type,
      closeAt,
      openAt,
      address: addressRaw,
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
      restaurant.address = new Address({
        city: address.city,
        district: address.district,
        state: address.state,
        street: address.street,
        zip: address.zip,
      });
    }

    name ? (restaurant.name = name) : null;
    description ? (restaurant.description = description) : null;
    tags ? (restaurant.tags = tags) : null;
    type ? (restaurant.type = type) : null;
    openAt ? (restaurant.openAt = openAt) : null;
    closeAt ? (restaurant.closeAt = closeAt) : null;
    await this.restaurantsRepository.save(restaurant);

    return { restaurant };
  }
}
