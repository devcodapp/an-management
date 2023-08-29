import { FilterRestaurantBody } from '../dtos/filter-restaurant.body';
import { Restaurant } from '../entities/restaurant';

export abstract class RestaurantsRepository {
  abstract create(restaurant: Restaurant): Promise<void>;

  abstract restaurant(restaurantId: string): Promise<Restaurant | null>;

  abstract restaurants(
    filters: FilterRestaurantBody,
  ): Promise<Restaurant[] | null>;

  abstract save(restaurant: Restaurant): Promise<void>;
}
