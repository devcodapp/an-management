import { Inject, Injectable } from '@nestjs/common';
import { WorkerNotFound } from './errors/worker-not-found';
import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface DeleteWorkerRequest {
  workerId: string;
}
interface DeleteWorkerResponse {
  worker: Worker;
}

@Injectable()
export class DeleteWorker {
  constructor(
    private workerRepository: WorkerRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: DeleteWorkerRequest): Promise<DeleteWorkerResponse> {
    const { workerId } = request;

    const worker = await this.workerRepository.worker(workerId);

    if (!worker) {
      throw new WorkerNotFound();
    }

    worker.delete(this.req['user'].sub);

    await this.workerRepository.save(worker);

    return { worker };
  }
}
