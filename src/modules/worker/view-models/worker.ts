import { Worker } from '../entities/worker';

export class WorkerViewModel {
  static toHTTP(Worker: Worker): IWorkerView {
    return {
      id: Worker.id,
      name: Worker.name,
      imageUrl: Worker.imageUrl,
      password: Worker.password,
      role: Worker.role,
      userId: Worker.userId,
    };
  }
}

export interface IWorkerView {
  id: string;
  name: string;
  imageUrl: string;
  password: string;
  role: 'admin' | 'colaborator';
  userId: string;
}
