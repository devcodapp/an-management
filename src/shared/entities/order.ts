import { HttpException, HttpStatus } from '@nestjs/common';

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
      throw new HttpException('Ordem inválida', HttpStatus.BAD_REQUEST);
    }

    this.order = order;
  }
}
