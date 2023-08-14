export interface CouponFilterInput {
  title?: string;
  description?: string;
  code?: string;
  expired?: boolean;
  restaurantId: string;
  deleted?: boolean;
}
