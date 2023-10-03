import { Injectable } from '@nestjs/common';

import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';
import { WorkerNotFound } from './errors/worker-not-found';

interface DisableWorkerRequest {
  workerIds: string[];
}
interface DisableWorkerResponse {
  workers: Worker[];
}

@Injectable()
export class DisableWorker {
  constructor(
    private workerRepository: WorkerRepository,
  ) {}

  async execute(request: DisableWorkerRequest): Promise<DisableWorkerResponse> {
    const { workerIds } = request;

    const workers: Worker[] = []

    for(const id of workerIds){
      const worker = await this.workerRepository.worker(id);
  
      if (!worker) {
        throw new WorkerNotFound();
      }
  
      worker.disable();
  
      await this.workerRepository.save(worker);

      workers.push(worker);
    }


    return { workers };
  }
}
