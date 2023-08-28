import { Owner } from '@modules/owner/entities/owner';
import { User } from '@modules/user/entities/user';
import { Owner as RawOwner, User as RawUser } from '@prisma/client';

export class PrismaOwnerMapper {
  static toPrisma(owner: Owner) {
    return {
      id: owner.id,
      name: owner.name,
      userId: owner.userId,
      deleted: owner.deleted,
      imageId: owner.imageId,
      imageUrl: owner.imageUrl,
      deletedAt: owner.deletedAt,
    };
  }

  static toDomain(raw: RawOwner & { user: RawUser }) {
    const user = new User({ ...raw.user, restaurantId: raw.user.restaurantId || undefined, deletedAt: raw.user.deletedAt || undefined })
    return new Owner({
      name: raw.name,
      userId: raw.userId,
      createdAt: raw.createdAt,
      deleted: raw.deleted,
      imageId: raw.imageId || undefined,
      imageUrl: raw.imageUrl || undefined,
      deletedAt: raw.deletedAt ?? undefined,
      id: raw.id,
      user
    });
  }
}
