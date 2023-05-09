import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a worker entity
export interface worker {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class WorkerService {
  private readonly workers: worker[] = [
    {
      id: '1',
      name: 'john',
      email: 'john@example.com',
      password: 'changeme',
    },
    {
      id: '2',
      name: 'maria',
      email: 'maria@example.com',
      password: 'guess',
    },
  ];

  async findOne(name: string): Promise<worker | undefined> {
    return this.workers.find((worker) => worker.name === name);
  }
}
