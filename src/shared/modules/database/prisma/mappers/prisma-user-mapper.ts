import { User } from '@modules/user/entities/user';
import { User as RawUser } from '@prisma/client';

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
      name: user.name,
      googleId: user.googleId,
    };
  }

  static toDomain(raw: RawUser) {
    return new User({
      email: raw.email,
      password: raw.password ?? undefined,
      restaurantId: raw.restaurantId ?? undefined,
      username: raw.username ?? undefined,
      name: raw.name ?? undefined,
      googleId: raw.googleId ?? undefined,
      changePassword: raw.changePassword,
      deletedAt: raw.deletedAt ?? undefined,
      id: raw.id,
    });
  }
}
