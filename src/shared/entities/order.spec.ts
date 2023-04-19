import { Order } from './order';

describe('Order', () => {
  it('should be able to create a order', () => {
    const order = new Order(5);

    expect(order).toBeTruthy();
  });

  it('should not be able to create a order with value less than 1', () => {
    expect(() => new Order(0)).toThrow();
  });
  it('should not be able to create a order with value more than 10', () => {
    expect(() => new Order(11)).toThrow();
  });
});
