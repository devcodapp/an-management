import { Inject, Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { WorkerRepository } from '../repositories/worker-repository';
import { Worker } from '../entities/worker';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UsersRepository } from '@shared/modules/user/repositories/user-repository';
import { User } from '@shared/modules/user/entities/user';
import { generateSKU } from '@shared/services/generateSKU';

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
    private userRepository: UsersRepository,
    private cloudinary: CloudinaryService,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: CreateWorkerRequest): Promise<CreateWorkerResponse> {
    const { email, name, restaurantId, role } = request;

    const password = generateSKU(6).toLowerCase();

    const user = new User({
      restaurantId,
      email,
      username: name,
      password,
      changePassword: true,
    });

    await this.userRepository.create(user);

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
