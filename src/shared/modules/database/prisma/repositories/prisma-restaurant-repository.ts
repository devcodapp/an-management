import { Restaurant } from '@modules/restaurant/entities/restaurant';
import { RestaurantFilterInput } from '@modules/restaurant/interfaces/restaurant-filter.input';
import { RestaurantsRepository } from '@modules/restaurant/repositories/restaurant-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaRestaurantMapper } from '../mappers/prisma-restaurant-mapper';

@Injectable()
export class PrismaRestaurantRepository implements RestaurantsRepository {
  constructor(private prisma: PrismaService) {}

  async create(restaurant: Restaurant): Promise<void> {
    const raw = PrismaRestaurantMapper.toPrisma(restaurant);

    await this.prisma.restaurant.create({
      data: {
        name: raw.name,
        description: raw.description,
        type: raw.type,
        tags: raw.tags,
        id: raw.id,
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
  async restaurants(
    filters: RestaurantFilterInput,
  ): Promise<Restaurant[] | null> {
    const restaurants = await this.prisma.restaurant.findMany({
      where: {
        ...(filters.name
          ? { name: { contains: filters.name, mode: 'insensitive' } }
          : {}),
        ...(filters.description
          ? {
              description: {
                contains: filters.description,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(filters.tags ? { tags: { hasSome: filters.tags } } : {}),
        ...(filters.type ? { type: filters.type } : {}),
        ...(filters.isOpened != undefined
          ? { isOpened: filters.isOpened }
          : {}),
        ...(filters.disabledAt
          ? { disabledAt: { not: null } }
          : { disabledAt: undefined }),
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
