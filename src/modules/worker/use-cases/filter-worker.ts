import { Injectable } from '@nestjs/common';
import { FilterWorkerBody } from '../dtos/filter-worker.body';
import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';

interface FilterWorkerResponse {
  workers: Worker[] | null;
}

@Injectable()
export class FilterWorker {
  constructor(private workerRepository: WorkerRepository) {}

  async execute(request: FilterWorkerBody): Promise<FilterWorkerResponse> {
    const workers = await this.workerRepository.workers(request);

    return { workers };
  }
}
