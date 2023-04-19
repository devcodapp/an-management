export class Order {
  private readonly order: number;

  get value(): number {
    return this.order;
  }

  private validateOrder(order: number): boolean {
    return order >= 1 && order <= 10;
  }

  constructor(order: number) {
    const isOrderValid = this.validateOrder(order);

    if (!isOrderValid) {
      throw new Error('Invalid order');
    }

    this.order = order;
  }
}
