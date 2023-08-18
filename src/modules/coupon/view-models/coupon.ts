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
    restaurantId,
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
      restaurantId,
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
  restaurantId: string;
}
