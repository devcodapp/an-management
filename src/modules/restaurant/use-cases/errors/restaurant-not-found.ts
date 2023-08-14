export class RestaurantNotFound extends Error {
  constructor() {
    super('Restaurant not found');
  }
}
