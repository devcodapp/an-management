import { User as RawUser } from '@prisma/client';
import { User } from '@shared/modules/user/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      restaurantId: user.restaurantId,
      changePassword: user.changePassword,
      deletedAt: user.deletedAt,
    };
  }

  static toDomain(raw: RawUser) {
    return new User({
      email: raw.email,
      password: raw.password,
      restaurantId: raw.restaurantId,
      username: raw.username,
      changePassword: raw.changePassword,
      deletedAt: raw.deletedAt ?? undefined,
      id: raw.id,
    });
  }
}
