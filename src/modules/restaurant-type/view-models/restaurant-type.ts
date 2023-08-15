import { RestaurantType } from '../entities/restaurant-type';

export class RestaurantTypeViewModel {
  static toHTTP({ id, name }: RestaurantType): IRestaurantTypeView {
    return {
      id,
      name,
    };
  }
}

export interface IRestaurantTypeView {
  id: string;
  name: string;
}
