import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { WorkerRepository } from '../repositories/worker-repository';
import { Worker } from '../entities/worker';

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
      { createdUser: '123' },
    );

    await this.workerRepository.create(worker);

    return {
      worker,
    };
  }
}
