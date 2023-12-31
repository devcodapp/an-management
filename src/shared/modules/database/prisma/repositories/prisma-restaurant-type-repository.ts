import { RestaurantType } from '@modules/restaurant-type/entities/restaurant-type';
import { RestaurantTypesRepository } from '@modules/restaurant-type/repositories/restaurant-type-repository';
import { Injectable } from '@nestjs/common';
import { PrismaRestaurantTypeMapper } from '../mappers/prisma-restaurant-type-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class PrismaRestaurantTypeRepository
  implements RestaurantTypesRepository {
  constructor(private prisma: PrismaService) { }

  async delete(restaurantTypeId: string): Promise<void> {
    await this.prisma.restaurantType.delete({ where: { id: restaurantTypeId } })
  }
  async create(restaurantType: RestaurantType): Promise<void> {
    const raw = PrismaRestaurantTypeMapper.toPrisma(restaurantType);

    await this.prisma.restaurantType.create({
      data: {
        name: raw.name,
        createdUser: raw.createdUser,
        id: raw.id,
      },
    });
  }

  async restaurantType(
    restaurantTypeId: string,
  ): Promise<RestaurantType | null> {
    const restaurantType = await this.prisma.restaurantType.findUnique({
      where: { id: restaurantTypeId },
    });

    if (!restaurantType) {
      return null;
    }

    return PrismaRestaurantTypeMapper.toDomain(restaurantType);
  }

  async restaurantTypes(): Promise<RestaurantType[] | null> {
    const restaurantTypes = await this.prisma.restaurantType.findMany({
      orderBy: { name: 'asc' },
    });

    return restaurantTypes.map(PrismaRestaurantTypeMapper.toDomain);
  }

  async save(restaurantType: RestaurantType): Promise<void> {
    const { id, ...raw } = PrismaRestaurantTypeMapper.toPrisma(restaurantType);

    await this.prisma.restaurantType.update({
      data: raw,
      where: { id },
    });
  }
}
