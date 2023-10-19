import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantPaymentNotFound extends HttpException {
  constructor() {
    super('Tipo de pagamento não encontrado.', HttpStatus.NOT_FOUND);
  }
}
