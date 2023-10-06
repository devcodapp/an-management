import { FilterWorkerBody } from '@modules/worker/dtos/filter-worker.body';
import { Worker, WorkerPaginated } from '@modules/worker/entities/worker';
import { WorkerRepository } from '@modules/worker/repositories/worker-repository';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationProps } from '@shared/dtos/pagination-body';
import { Paginate } from 'src/utils/pagination';

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
      include: { user: { include: { role_users: { include: { role: true } } } } }
    });

    if (!worker) {
      return null;
    }

    return PrismaWorkerMapper.toDomain(worker as any);
  }

  async workers(filters: FilterWorkerBody): Promise<Worker[] | null> {
    const workers = await this.prisma.worker.findMany({
      where: {
        ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
        ...(filters.email && {
          user: {
            email: { contains: filters.email, mode: 'insensitive' }
          }
        }),
        ...(filters.restaurantId && { user: { restaurantId: filters.restaurantId, } }),
        deleted: filters.deleted || false,
      },
      orderBy: { name: 'asc' },
      include: { user: { include: { role_users: { include: { role: true } } } } }
    });
    return workers.map(PrismaWorkerMapper.toDomain as any);
  }

  async workersPagination(filters: FilterWorkerBody, { currentPage, perPage }: PaginationProps): Promise<WorkerPaginated> {
    const query: Prisma.WorkerFindManyArgs = {
      where: {
        ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
        ...(filters.email && {
          user: {
            email: { contains: filters.email, mode: 'insensitive' }
          }
        }),
        ...(filters.restaurantId && { user: { restaurantId: filters.restaurantId, } }),
        deleted: filters.deleted || false,
      },
    }

    const [items, count] = await this.prisma.$transaction([
      this.prisma.worker.findMany({
        where: query.where,
        orderBy: { name: 'asc' },
        include: { user: { include: { role_users: { include: { role: true } } } } },
        skip: perPage * (currentPage - 1),
        take: perPage
      }),
      this.prisma.worker.count({ where: query.where })
    ])

    const pagination = await Paginate(count, perPage, currentPage)
    console.log(items)
    return {
      items: items.map(PrismaWorkerMapper.toDomain as any),
      pagination
    };
  }

  async save(worker: Worker): Promise<void> {
    const { id, ...raw } = PrismaWorkerMapper.toPrisma(worker);
    await this.prisma.worker.update({
      data: { ...raw },
      where: { id },
    });
  }
}
