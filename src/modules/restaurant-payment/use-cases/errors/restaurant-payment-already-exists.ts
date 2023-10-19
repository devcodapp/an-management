import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantPaymentAlreadyExits extends HttpException {
  constructor() {
    super('Método de pagamento já cadastrado.', HttpStatus.CONFLICT);
  }
}
