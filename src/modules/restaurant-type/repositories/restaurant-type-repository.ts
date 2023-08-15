import { RestaurantType } from '../entities/restaurant-type';

export abstract class RestaurantTypesRepository {
  abstract create(restaurantType: RestaurantType): Promise<void>;

  abstract restaurantType(
    restaurantTypeId: string,
  ): Promise<RestaurantType | null>;

  abstract restaurantTypes(): Promise<RestaurantType[] | null>;

  abstract save(restaurantType: RestaurantType): Promise<void>;
}
