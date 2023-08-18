import { Restaurant } from '../entities/restaurant';
import { RestaurantFilterInput } from '../interfaces/restaurant-filter.input';

export abstract class RestaurantsRepository {
  abstract create(restaurant: Restaurant): Promise<void>;

  abstract restaurant(restaurantId: string): Promise<Restaurant | null>;

  abstract restaurants(
    filters: RestaurantFilterInput,
  ): Promise<Restaurant[] | null>;

  abstract save(restaurant: Restaurant): Promise<void>;
}
