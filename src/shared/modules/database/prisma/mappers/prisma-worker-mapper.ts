import { Worker } from '@modules/worker/entities/worker';
import { Role as RawRole, Role_User as RawRole_User, User as RawUser, Worker as RawWorker } from '@prisma/client';

export class PrismaWorkerMapper {
  static toPrisma(worker: Worker) {
    return {
      id: worker.id,
      name: worker.name,
      imageId: worker.imageId,
      imageUrl: worker.imageUrl,
      createdUser: worker.createdUser,
      createdAt: worker.createdAt,
      deletedUser: worker.deletedUser,
      deletedAt: worker.deletedAt,
      userId: worker.userId,
      deleted: worker.deleted,
      disabled: worker.disabled,
      restaurantId: worker.restaurantId
    };
  }

  static toDomain(raw: RawWorker & { user?: RawUser & { role_users?: RawRole_User & { role?: RawRole }[] } }) {
    const roles = raw.user?.role_users?.map(ru => ({ id: ru.role?.id!, name: ru.role?.name!, description: ru.role?.description!, permissions: ru.role?.permissions }))
    const user = raw.user ? {
      email: raw.user?.email,
      username: raw.user?.username,
      roles
    } : undefined
    return new Worker(
      {
        userId: raw.userId,
        imageId: raw.imageId || undefined,
        imageUrl: raw.imageUrl || undefined,
        name: raw.name,
        restaurantId: raw.restaurantId,
        user,
        disabled: raw.disabled
      },
      {
        createdAt: raw.createdAt,
        createdUser: raw.createdUser,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
        id: raw.id,
        deleted: raw.deleted,
      },
    );
  }
}
