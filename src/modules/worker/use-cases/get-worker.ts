import { Injectable } from '@nestjs/common';
import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';

interface GetWorkerRequest {
  id: string;
}

interface GetWorkerResponse {
  worker: Worker | null;
}

@Injectable()
export class GetWorker {
  constructor(private workerRepository: WorkerRepository) {}

  async execute(request: GetWorkerRequest): Promise<GetWorkerResponse> {
    const { id } = request;

    const worker = await this.workerRepository.worker(id);
    return { worker };
  }
}
