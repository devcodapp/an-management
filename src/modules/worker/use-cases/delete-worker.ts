import { UsersRepository } from '@modules/user/repositories/user-repository';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';
import { WorkerNotFound } from './errors/worker-not-found';

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
    private userRepository: UsersRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: DeleteWorkerRequest): Promise<DeleteWorkerResponse> {
    const { workerId } = request;

    const worker = await this.workerRepository.worker(workerId);

    if (!worker) {
      throw new WorkerNotFound();
    }

    const user = await this.userRepository.user(worker.userId);

    if (user) {
      user.deletedAt = new Date();
      await this.userRepository.save(user);
    }

    worker.delete(this.req['user'].sub);

    await this.workerRepository.save(worker);

    return { worker };
  }
}
