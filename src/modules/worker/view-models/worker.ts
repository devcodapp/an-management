import { Worker } from '../entities/worker';

export class WorkerViewModel {
  static toHTTP(Worker: Worker & { password?: string }): IWorkerView {
    return {
      id: Worker.id,
      name: Worker.name,
      imageUrl: Worker.imageUrl,
      userId: Worker.userId,
      username: Worker.user?.username,
      email: Worker.user?.email,
      restaurantId: Worker.user?.restaurantId,
      roles: Worker.user?.roles,
      disabled: Worker.disabled
    };
  }
}

export interface IWorkerView {
  id: string;
  name: string;
  imageUrl?: string;
  userId: string;
  username?: string
  email?: string
  restaurantId?: string
  roles?: IRoleView[]
  disabled?: boolean
}

interface IRoleView{
  name: string
  description: string
  permissions?: Permission[]
  id: string
}

interface Permission {
  name: string;
  values: string[];
}
