export interface CompanyFilterInput {
  name?: string;
  description?: string;
  tags?: string[];
  type?: string;
  isOpened?: boolean;
  disabledAt?: boolean;
}
