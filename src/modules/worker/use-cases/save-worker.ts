import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { WorkerNotFound } from './errors/worker-not-found';
import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';

interface SaveWorkerRequest {
  workerId: string;
  name?: string;
  email: string;
  password: string;
  role: 'admin' | 'colaborator';
  image?: Express.Multer.File;
}
interface SaveWorkerResponse {
  worker: Worker;
}

@Injectable()
export class SaveWorker {
  constructor(
    private workerRepository: WorkerRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(request: SaveWorkerRequest): Promise<SaveWorkerResponse> {
    const { workerId, name, email, password, role, image } = request;

    const worker = await this.workerRepository.worker(workerId);

    if (!worker) {
      throw new WorkerNotFound();
    }

    if (image) {
      await this.cloudinary.deleteImage(worker.imageId);

      const uploadedImage = await this.cloudinary.uploadImage(image);
      worker.imageId = uploadedImage.public_id;
      worker.imageUrl = uploadedImage.url;
    }

    name ? (worker.name = name) : null;
    email ? (worker.email = email) : null;
    password ? (worker.password = password) : null;
    role ? (worker.role = role) : null;

    await this.workerRepository.save(worker);

    return { worker };
  }
}
