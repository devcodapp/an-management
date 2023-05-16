import { Inject, Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { WorkerRepository } from '../repositories/worker-repository';
import { Worker } from '../entities/worker';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface CreateWorkerRequest {
  name: string;
  role: 'admin' | 'colaborator';
  userId: string;
  image: Express.Multer.File;
}
interface CreateWorkerResponse {
  worker: Worker;
}

@Injectable()
export class CreateWorker {
  constructor(
    private workerRepository: WorkerRepository,
    private cloudinary: CloudinaryService,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: CreateWorkerRequest): Promise<CreateWorkerResponse> {
    const { userId, name, role, image } = request;
    const uploadedImage = await this.cloudinary.uploadImage(image);

    const worker = new Worker(
      {
        name,
        role,
        imageId: uploadedImage.public_id,
        imageUrl: uploadedImage.url,
        userId,
      },
      { createdUser: this.req['user'].sub },
    );

    await this.workerRepository.create(worker);

    return {
      worker,
    };
  }
}
