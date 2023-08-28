import { CreateUser } from '@modules/user/use-cases/create-user';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { generateSKU } from '@shared/services/generateSKU';
import { Request } from 'express';

import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';

interface CreateWorkerRequest {
  name: string;
  email: string;
  role: 'admin' | 'colaborator';
  restaurantId: string;
}
interface CreateWorkerResponse {
  worker: Worker & { password?: string };
}

@Injectable()
export class CreateWorker {
  constructor(
    private workerRepository: WorkerRepository,
    private createUser: CreateUser,
    private cloudinary: CloudinaryService,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: CreateWorkerRequest): Promise<CreateWorkerResponse> {
    const { email, name, restaurantId, role } = request;

    const password = generateSKU(6).toLowerCase();

    const {user} = await this.createUser.execute({email, name, password, restaurantId});

    const worker = new Worker(
      {
        name,
        role,
        userId: user.id,
      },
      { createdUser: this.req['user'].sub },
    );

    await this.workerRepository.create(worker);

    return {
      worker: Object.assign(worker, { password }),
    };
  }
}
