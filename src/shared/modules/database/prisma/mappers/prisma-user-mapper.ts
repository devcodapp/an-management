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
    };
  }

  static toDomain(raw: RawUser & { role_users?: any}) {
    const roles = raw.role_users?.map(role => role.roleId);
    return new User({
      email: raw.email,
      password: raw.password,
      restaurantId: raw.restaurantId ?? undefined,
      username: raw.username,
      changePassword: raw.changePassword,
      deletedAt: raw.deletedAt ?? undefined,
      id: raw.id,
      roleIds: roles || undefined
    });
  }
}
