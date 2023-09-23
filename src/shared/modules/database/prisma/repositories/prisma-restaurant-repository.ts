import { FilterRestaurantBody } from '@modules/restaurant/dtos/filter-restaurant.body';
import { Restaurant } from '@modules/restaurant/entities/restaurant';
import { RestaurantsRepository } from '@modules/restaurant/repositories/restaurant-repository';
import { Injectable } from '@nestjs/common';

import { PrismaRestaurantMapper } from '../mappers/prisma-restaurant-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class PrismaRestaurantRepository implements RestaurantsRepository {
  constructor(private prisma: PrismaService) { }


  async create(restaurant: Restaurant): Promise<void> {
    const raw = PrismaRestaurantMapper.toPrisma(restaurant);

    await this.prisma.restaurant.create({
      data: {
        name: raw.name,
        description: raw.description,
        type: raw.type,
        tags: raw.tags,
        id: raw.id,
        ownerId: raw.ownerId,
        slug: raw.slug
      },
    });
  }
  async restaurant(restaurantId: string): Promise<Restaurant | null> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      return null;
    }

    return PrismaRestaurantMapper.toDomain(restaurant);
  }

  async restaurantBySlug(slug: string): Promise<Restaurant | null> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { slug },
    });

    if (!restaurant) {
      return null;
    }

    return PrismaRestaurantMapper.toDomain(restaurant);
  }

  async restaurants(
    filters: FilterRestaurantBody,
  ): Promise<Restaurant[] | null> {
    const restaurants = await this.prisma.restaurant.findMany({
      where: {
        ...(filters.name
          && { name: { contains: filters.name, mode: 'insensitive' } }
        ),
        ...(filters.description
          && {
          description: {
            contains: filters.description,
            mode: 'insensitive',
          },
        }
        ),
        ...(filters.tags && { tags: { hasSome: filters.tags } }),
        ...(filters.type && { type: filters.type }),
        ...(filters.isOpened != undefined
          && { isOpened: filters.isOpened }
        ),
        ...(filters.disabled
          ? { disabled: true }
          : { disabled: false }),
      },
      orderBy: { name: 'asc' },
    });

    return restaurants.map(PrismaRestaurantMapper.toDomain);
  }
  async save(restaurant: Restaurant): Promise<void> {
    const { id, ...raw } = PrismaRestaurantMapper.toPrisma(restaurant);

    await this.prisma.restaurant.update({
      data: { ...raw },
      where: { id },
    });
  }
}
