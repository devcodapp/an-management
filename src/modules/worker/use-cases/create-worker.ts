import { AddUserRole } from '@modules/role/use-cases/add-user-role';
import { UsersRepository } from '@modules/user/repositories/user-repository';
import { CreateUser } from '@modules/user/use-cases/create-user';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { generateSKU } from '@shared/services/generateSKU';
import { Request } from 'express';

import { CreateWorkerBody } from '../dtos/create-worker.body';
import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';

interface CreateWorkerResponse {
  worker: Worker & { password?: string };
}

@Injectable()
export class CreateWorker {
  constructor(
    private workerRepository: WorkerRepository,
    private userRepository: UsersRepository,
    private createUser: CreateUser,
    private addUserRole: AddUserRole,
    private cloudinary: CloudinaryService,
    @Inject(REQUEST) private req: Request,
  ) { }

  async execute(request: CreateWorkerBody): Promise<CreateWorkerResponse> {
    const { email, name, restaurantId, image, roleId } = request;

    const password = generateSKU(6).toLowerCase();

    let user = await this.userRepository.userByEmail(email)

    if (!user) {
      user = (await this.createUser.execute({ email, name, password })).user;
    }

    if (roleId) {
      await this.addUserRole.execute({ roleId, userId: user.id })
    }

    const worker = new Worker(
      {
        name,
        userId: user.id,
        restaurantId
      },
      { createdUser: this.req['user'].sub },
    );

    if (image) {
      if (worker.imageId) await this.cloudinary.deleteImage(worker.imageId);

      const uploadedImage = await this.cloudinary.uploadImage(image);

      worker.imageId = uploadedImage.public_id;
      worker.imageUrl = uploadedImage.url;
    }

    await this.workerRepository.create(worker);

    return {
      worker: Object.assign(worker, { password }),
    };
  }
}
