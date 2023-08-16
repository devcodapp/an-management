import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantTypeNotFound extends HttpException {
  constructor() {
    super('Tipo de restaurante não encontrado', HttpStatus.NOT_FOUND);
  }
}
