import { Worker } from '../entities/worker';

export class WorkerViewModel {
  static toHTTP(Worker: Worker & { password?: string }): IWorkerView {
    return {
      id: Worker.id,
      name: Worker.name,
      imageUrl: Worker.imageUrl,
      userId: Worker.userId,
    };
  }
}

export interface IWorkerView {
  id: string;
  name: string;
  imageUrl?: string;
  userId: string;
}
