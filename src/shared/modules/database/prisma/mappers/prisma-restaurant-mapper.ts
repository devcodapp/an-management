import { Address } from '@modules/restaurant/entities/address';
import { OpeningHours } from '@modules/restaurant/entities/openingHours';
import { Restaurant } from '@modules/restaurant/entities/restaurant';
import { Restaurant as RawRestaurant } from '@prisma/client';

export class PrismaRestaurantMapper {
  static toPrisma(restaurant: Restaurant) {
    const newRestaurant = {} as any
    for (const field in restaurant['props']) {
      newRestaurant[field] = restaurant['props'][field]
    }
    
    return newRestaurant;
  }

  static toDomain(raw: RawRestaurant) {
    return new Restaurant({
      name: raw.name,
      imageUrl: raw.imageUrl ?? undefined,
      imageId: raw.imageId ?? undefined,
      description: raw.description,
      slug: raw.slug,
      tags: raw.tags,
      type: raw.type,
      address: raw.address ? new Address(raw.address as any) : undefined,
      isOpened: raw.isOpened,
      openingHours: raw.openingHours
        ? raw.openingHours.map(openingHour => new OpeningHours(openingHour as any))
        : undefined,
      createdAt: raw.createdAt,
      disabledAt: raw.disabledAt ?? undefined,
      id: raw.id,
      disabled: raw.disabled,
      ownerId: raw.ownerId,
      bannerId: raw.bannerId || undefined,
      bannerUrl: raw.bannerUrl || undefined,
      phoneNumber: raw.phoneNumber || undefined,
    });
  }
}
