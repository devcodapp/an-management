import { FilterWorkerBody } from '@modules/worker/dtos/filter-worker.body';
import { Worker } from '@modules/worker/entities/worker';
import { WorkerRepository } from '@modules/worker/repositories/worker-repository';
import { Injectable } from '@nestjs/common';
import { PrismaWorkerMapper } from '../mappers/prisma-worker-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class PrismaWorkerRepository implements WorkerRepository {
  constructor(private prisma: PrismaService) { }

  async create(worker: Worker): Promise<void> {
    const raw = PrismaWorkerMapper.toPrisma(worker);

    await this.prisma.worker.create({
      data: { ...raw },
    });
  }
  async worker(workerId: string): Promise<Worker | null> {
    const worker = await this.prisma.worker.findUnique({
      where: { id: workerId },
    });

    if (!worker) {
      return null;
    }

    return PrismaWorkerMapper.toDomain(worker);
  }

  async workers({
    deleted,
    ...filters
  }: FilterWorkerBody): Promise<Worker[] | null> {
    const workers = await this.prisma.worker.findMany({
      where: {
        ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
        ...(filters.email && { user: {
          email: {contains: filters.email, mode: 'insensitive'}
        } }),
        ...(filters.restaurantId && { user: { restaurantId: filters.restaurantId,} }),
        deleted: deleted || false,
      },
      orderBy: { name: 'asc' },
    });
    return workers.map(PrismaWorkerMapper.toDomain);
  }

  async save(worker: Worker): Promise<void> {
    const { id, ...raw } = PrismaWorkerMapper.toPrisma(worker);
    await this.prisma.worker.update({
      data: { ...raw },
      where: { id },
    });
  }
}
