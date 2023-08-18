import { RestaurantType } from '@modules/restaurant-type/entities/restaurant-type';
import { RestaurantType as RawRestaurantType } from '@prisma/client';

export class PrismaRestaurantTypeMapper {
  static toPrisma(restaurantType: RestaurantType) {
    return restaurantType;
  }

  static toDomain(raw: RawRestaurantType) {
    return new RestaurantType(
      { name: raw.name },
      {
        createdUser: raw.createdUser,
        createdAt: raw.createdAt,
        deleted: raw.deleted,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
        id: raw.id,
      },
    );
  }
}
