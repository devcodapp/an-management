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
    disabled,
    initiateIn,
    singleUse
  }: Coupon): ICouponView {
    return {
      id,
      title,
      description,
      code,
      discountLimit,
      discountPercentage,
      discountValue,
      singleUse,
      initiateIn,
      expiresIn,
      disabled,
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
  singleUse: boolean;
  initiateIn?: Date;
  expiresIn?: Date;
  disabled: boolean;
  restaurantId: string;
}
