export interface CouponFilterInput {
  title?: string;
  description?: string;
  code?: string;
  expired?: boolean;
  companyId: string;
  deleted?: boolean;
}
