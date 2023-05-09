import { Worker } from '../entities/worker';

export class WorkerViewModel {
  static toHTTP(Worker: Worker): IWorkerView {
    return {
      id: Worker.id,
      name: Worker.name,
      email: Worker.email,
      imageUrl: Worker.imageUrl,
      password: Worker.password,
      role: Worker.role,
      companyId: Worker.companyId,
    };
  }
}

export interface IWorkerView {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  password: string;
  role: 'admin' | 'colaborator';
  companyId: string;
}
