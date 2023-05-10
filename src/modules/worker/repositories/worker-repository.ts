import { Worker } from '../entities/worker';
import { WorkerFilterInput } from '../interfaces/worker-filter.input';

export abstract class WorkerRepository {
  abstract create(worker: Worker): Promise<void>;

  abstract worker(workerId: string): Promise<Worker | null>;

  abstract workers(filters: WorkerFilterInput): Promise<Worker[] | null>;

  abstract save(worker: Worker): Promise<void>;
}
