import { User } from '@modules/users/entities/user';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      imageId: user.imageId,
      imageUrl: user.imageUrl,
      createdUser: user.createdUser,
      createdAt: user.createdAt,
      deletedUser: user.deletedUser,
      deletedAt: user.deletedAt,
      companyId: user.companyId,
    };
  }

  static toDomain(raw: RawUser) {
    return new User(
      {
        companyId: raw.companyId,
        email: raw.email,
        imageId: raw.imageId,
        imageUrl: raw.imageUrl,
        name: raw.name,
        password: raw.password,
        role: raw.role,
      },
      {
        createdAt: raw.createdAt,
        createdUser: raw.createdUser,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
        id: raw.id,
      },
    );
  }
}
