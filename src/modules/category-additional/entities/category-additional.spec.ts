import { randomUUID } from 'crypto';
import { CategoryAdditional } from './category-additional';
import { Order } from '@shared/entities/order';

describe('CategoryAdditional', () => {
  it('should be able to create a category additional', () => {
    const categoryAdditional = new CategoryAdditional(
      {
        name: 'Teste',
        order: new Order(1),
        restaurantId: randomUUID(),
      },
      { createdUser: randomUUID() },
    );

    expect(categoryAdditional).toBeTruthy();
  });
});
