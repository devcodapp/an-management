import { Worker } from '../entities/worker';

export class WorkerViewModel {
  static toHTTP(Worker: Worker & { password?: string }): IWorkerView {
    return {
      id: Worker.id,
      name: Worker.name,
      imageUrl: Worker.imageUrl,
      role: Worker.role,
      userId: Worker.userId,
      password: Worker.password,
    };
  }
}

export interface IWorkerView {
  id: string;
  name: string;
  imageUrl?: string;
  role: 'admin' | 'colaborator';
  userId: string;
  password?: string;
}
