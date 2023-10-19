import { SaveUser } from '@modules/user/use-cases/save-user';
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { SaveWorkerBody } from '../dtos/save-worker.body';
import { Worker } from '../entities/worker';
import { WorkerRepository } from '../repositories/worker-repository';
import { WorkerNotFound } from './errors/worker-not-found';

interface SaveWorkerResponse {
  worker: Worker;
}

@Injectable()
export class SaveWorker {
  constructor(
    private workerRepository: WorkerRepository,
    private cloudinary: CloudinaryService,
    private saveUser: SaveUser,
  ) { }

  async execute(request: SaveWorkerBody): Promise<SaveWorkerResponse> {
    const { workerId, image, name, password, username } = request;

    const worker = await this.workerRepository.worker(workerId);

    if (!worker) {
      throw new WorkerNotFound();
    }

    if (image) {
      if (worker.imageId) await this.cloudinary.deleteImage(worker.imageId);

      const uploadedImage = await this.cloudinary.uploadImage(image);

      worker.imageId = uploadedImage.public_id;
      worker.imageUrl = uploadedImage.url;
    }

    await this.saveUser.execute({ userId: worker.userId, password, username })

    name && (worker.name = name)

    await this.workerRepository.save(worker);

    return { worker };
  }
}
