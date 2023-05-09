export interface WorkerFilterInput {
  name?: string;
  email?: string;
  role?: 'admin' | 'colaborator';
  companyId?: string;
}
