import { Address } from '@modules/restaurant/entities/address';
import {
  OpeningHours,
  OpeningHoursProps,
} from '@modules/restaurant/entities/openingHours';
import { Restaurant } from '@modules/restaurant/entities/restaurant';
import { Restaurant as RawRestaurant } from '@prisma/client';

export class PrismaRestaurantMapper {
  static toPrisma(restaurant: Restaurant) {
    return restaurant;
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
      openingHours: raw.openingHours
        ? new OpeningHours(raw.openingHours as OpeningHoursProps)
        : undefined,
      createdAt: raw.createdAt,
      disabledAt: raw.disabledAt ?? undefined,
      id: raw.id,
      disabled: raw.disabled,
      ownerId: raw.ownerId,
    });
  }
}
