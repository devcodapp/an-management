import { Injectable } from '@nestjs/common';
import { Order } from '@shared/entities/order';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { WorkerRepository } from '../repositories/worker-repository';
import { Worker } from '../entities/worker';

interface CreateWorkerRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'colaborator';
  companyId: string;
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
    const { companyId, name, email, password, role, image } = request;
    const uploadedImage = await this.cloudinary.uploadImage(image);
    const worker = new Worker(
      {
        name,
        email,
        password,
        role,
        imageId: uploadedImage.public_id,
        imageUrl: uploadedImage.url,
        companyId,
      },
      { createdWorker: '123' },
    );

    await this.workerRepository.create(worker);

    return {
      worker,
    };
  }
}
