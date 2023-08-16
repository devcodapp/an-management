import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantNotFound extends HttpException {
  constructor() {
    super('Restaurante não encontrado', HttpStatus.NOT_FOUND);
  }
}
