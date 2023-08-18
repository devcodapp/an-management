export interface RestaurantFilterInput {
  name?: string;
  description?: string;
  tags?: string[];
  type?: string;
  isOpened?: boolean;
  disabledAt?: boolean;
}
