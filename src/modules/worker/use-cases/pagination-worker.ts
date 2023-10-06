import { Injectable } from '@nestjs/common';
import { PaginationProps } from '@shared/dtos/pagination-body';

import { FilterWorkerBody } from '../dtos/filter-worker.body';
import { WorkerPaginated } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';

interface PaginationWorkerResponse {
  workers: WorkerPaginated
}

@Injectable()
export class PaginationWorker {
  constructor(private workerRepository: WorkerRepository) {}

  async execute(request: FilterWorkerBody, pagination: PaginationProps): Promise<WorkerPaginated> {
    const workers = await this.workerRepository.workersPagination(request, pagination);

    return workers;
  }
}
