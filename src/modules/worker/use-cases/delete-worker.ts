import { Injectable } from '@nestjs/common';
import { WorkerNotFound } from './errors/worker-not-found';
import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';

interface DeleteWorkerRequest {
  workerId: string;
}
interface DeleteWorkerResponse {
  worker: Worker;
}

@Injectable()
export class DeleteWorker {
  constructor(private workerRepository: WorkerRepository) {}

  async execute(request: DeleteWorkerRequest): Promise<DeleteWorkerResponse> {
    const { workerId } = request;

    const worker = await this.workerRepository.worker(workerId);

    if (!worker) {
      throw new WorkerNotFound();
    }

    worker.deletedAt = new Date();
    worker.deletedWorker = '123';

    await this.workerRepository.save(worker);

    return { worker };
  }
}
