import { Coupon } from '../entities/coupon';

export class CouponViewModel {
  static toHTTP({
    id,
    title,
    description,
    code,
    discountLimit,
    discountPercentage,
    discountValue,
    expiresIn,
    companyId,
  }: Coupon): ICouponView {
    return {
      id,
      title,
      description,
      code,
      discountLimit,
      discountPercentage,
      discountValue,
      expiresIn,
      companyId,
    };
  }
}

export interface ICouponView {
  id: string;
  title: string;
  description: string;
  code: string;
  discountValue?: number;
  discountPercentage?: number;
  discountLimit?: number;
  expiresIn: Date;
  companyId: string;
}
