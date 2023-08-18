export interface WorkerFilterInput {
  name?: string;
  role?: 'admin' | 'colaborator';
  restaurantId?: string;
  deleted?: boolean;
}
