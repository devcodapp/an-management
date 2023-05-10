export class WorkerNotFound extends Error {
  constructor() {
    super('Worker not found');
  }
}
