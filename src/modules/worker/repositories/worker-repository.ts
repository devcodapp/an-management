import { PaginationProps } from '@shared/dtos/pagination-body';

import { FilterWorkerBody } from '../dtos/filter-worker.body';
import { Worker, WorkerPaginated } from '../entities/worker';

export abstract class WorkerRepository {
  abstract create(worker: Worker): Promise<void>;

  abstract worker(workerId: string): Promise<Worker | null>;

  abstract workers(filters: FilterWorkerBody): Promise<Worker[] | null>;

  abstract workersPagination(filters: FilterWorkerBody, pagination: PaginationProps): Promise<WorkerPaginated>;

  abstract save(worker: Worker): Promise<void>;
}
