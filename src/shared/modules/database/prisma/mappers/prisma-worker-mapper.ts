import { Worker } from '@modules/worker/entities/worker';
import { Worker as RawWorker } from '@prisma/client';

export class PrismaWorkerMapper {
  static toPrisma(worker: Worker) {
    return {
      id: worker.id,
      name: worker.name,
      role: worker.role,
      imageId: worker.imageId,
      imageUrl: worker.imageUrl,
      createdUser: worker.createdUser,
      createdAt: worker.createdAt,
      deletedUser: worker.deletedUser,
      deletedAt: worker.deletedAt,
      userId: worker.userId,
    };
  }

  static toDomain(raw: RawWorker) {
    return new Worker(
      {
        userId: raw.userId,
        imageId: raw.imageId || undefined,
        imageUrl: raw.imageUrl || undefined,
        name: raw.name,
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
