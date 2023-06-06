import { Injectable } from '@nestjs/common';
import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';

interface FilterWorkerRequest {
  name?: string;
  role?: 'admin' | 'colaborator';
  companyId?: string;
  deleted?: boolean;
}

interface FilterWorkerResponse {
  workers: Worker[] | null;
}

@Injectable()
export class FilterWorker {
  constructor(private workerRepository: WorkerRepository) {}

  async execute(request: FilterWorkerRequest): Promise<FilterWorkerResponse> {
    const workers = await this.workerRepository.workers(request);

    return { workers };
  }
}
