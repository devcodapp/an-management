import { FilterWorkerBody } from '../dtos/filter-worker.body';
import { Worker } from '../entities/worker';

export abstract class WorkerRepository {
  abstract create(worker: Worker): Promise<void>;

  abstract worker(workerId: string): Promise<Worker | null>;

  abstract workers(filters: FilterWorkerBody): Promise<Worker[] | null>;

  abstract save(worker: Worker): Promise<void>;
}
