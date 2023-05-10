import { Worker } from '@modules/worker/entities/worker';
import { Worker as RawWorker } from '@prisma/client';

export class PrismaWorkerMapper {
  static toPrisma(worker: Worker) {
    return {
      id: worker.id,
      name: worker.name,
      email: worker.email,
      password: worker.password,
      role: worker.role,
      imageId: worker.imageId,
      imageUrl: worker.imageUrl,
      createdWorker: worker.createdWorker,
      createdAt: worker.createdAt,
      deletedWorker: worker.deletedWorker,
      deletedAt: worker.deletedAt,
      companyId: worker.companyId,
    };
  }

  static toDomain(raw: RawWorker) {
    return new Worker(
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
        createdWorker: raw.createdWorker,
        deletedAt: raw.deletedAt,
        deletedWorker: raw.deletedWorker,
        id: raw.id,
      },
    );
  }
}
