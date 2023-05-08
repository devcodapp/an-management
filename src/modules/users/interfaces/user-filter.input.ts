export interface UserFilterInput {
  name?: string;
  email?: string;
  role?: 'admin' | 'colaborator';
  companyId?: string;
}
