export class RestaurantTypeNotFound extends Error {
  constructor() {
    super('Restaurant type not found');
  }
}
