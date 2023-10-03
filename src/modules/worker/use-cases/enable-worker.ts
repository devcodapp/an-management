import { Injectable } from '@nestjs/common';

import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';
import { WorkerNotFound } from './errors/worker-not-found';

interface EnableWorkerRequest {
  workerIds: string[];
}
interface EnableWorkerResponse {
  workers: Worker[];
}

@Injectable()
export class EnableWorker {
  constructor(
    private workerRepository: WorkerRepository,
  ) {}

  async execute(request: EnableWorkerRequest): Promise<EnableWorkerResponse> {
    const { workerIds } = request;
    
    const workers: Worker[] = []

    for(const id of workerIds){

      const worker = await this.workerRepository.worker(id);
  
      if (!worker) {
        throw new WorkerNotFound();
      }
  
      worker.enable();
  
      await this.workerRepository.save(worker);

      workers.push(worker);
    }


    return { workers };
  }
}
