import { Address } from '@modules/restaurant/entities/address';
import { Restaurant } from '@modules/restaurant/entities/restaurant';
import { Restaurant as RawRestaurant } from '@prisma/client';

export class PrismaRestaurantMapper {
  static toPrisma(restaurant: Restaurant) {
    return {
      id: restaurant.id,
      name: restaurant.name,
      imageUrl: restaurant.imageUrl,
      imageId: restaurant.imageId,
      description: restaurant.description,
      tags: restaurant.tags,
      type: restaurant.type,
      address: {
        city: restaurant.address?.city,
        street: restaurant.address?.street,
        state: restaurant.address?.state,
        zip: restaurant.address?.zip,
        district: restaurant.address?.district,
      },
      isOpened: restaurant.isOpened,
      openAt: restaurant.openAt,
      closeAt: restaurant.closeAt,
      disabledAt: restaurant.disabledAt,
      createdAt: restaurant.createdAt,
      disabled: restaurant.disabled,
    };
  }

  static toDomain(raw: RawRestaurant) {
    return new Restaurant({
      name: raw.name,
      imageUrl: raw.imageUrl ?? undefined,
      imageId: raw.imageId ?? undefined,
      description: raw.description,
      tags: raw.tags,
      type: raw.type,
      address: raw.address ? new Address(raw.address as any) : undefined,
      isOpened: raw.isOpened,
      openAt: raw.openAt ?? undefined,
      closeAt: raw.closeAt ?? undefined,
      createdAt: raw.createdAt,
      disabledAt: raw.disabledAt ?? undefined,
      id: raw.id,
      disabled: raw.disabled,
    });
  }
}
