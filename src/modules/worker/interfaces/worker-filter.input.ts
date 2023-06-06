export interface WorkerFilterInput {
  name?: string;
  role?: 'admin' | 'colaborator';
  companyId?: string;
  deleted?: boolean;
}
