import { FilterRestaurantBody } from '../dtos/filter-restaurant.body';
import { Restaurant } from '../entities/restaurant';

export abstract class RestaurantsRepository {
  abstract create(restaurant: Restaurant): Promise<void>;

  abstract restaurant(restaurantId: string): Promise<Restaurant | null>;

  abstract restaurantBySlug(slug: string): Promise<Restaurant | null>;

  abstract restaurantsByOwner(ownerId: string): Promise<Restaurant[]>;

  abstract restaurantsByUser(userId: string): Promise<Restaurant[]>;

  abstract restaurants(
    filters: FilterRestaurantBody,
  ): Promise<Restaurant[] | null>;

  abstract save(restaurant: Restaurant): Promise<void>;
}
