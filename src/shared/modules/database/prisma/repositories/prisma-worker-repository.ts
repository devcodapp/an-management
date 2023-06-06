import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaWorkerMapper } from '../mappers/prisma-worker-mapper';
import { WorkerFilterInput } from '@modules/worker/interfaces/worker-filter.input';
import { WorkerRepository } from '@modules/worker/repositories/worker-repository';
import { Worker } from '@modules/worker/entities/worker';

@Injectable()
export class PrismaWorkerRepository implements WorkerRepository {
  constructor(private prisma: PrismaService) {}

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
  }: WorkerFilterInput): Promise<Worker[] | null> {
    const workers = await this.prisma.worker.findMany({
      where: {
        ...(filters ? filters : {}),
        ...(filters.name ? { name: { contains: filters.name } } : {}),
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
