import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFound extends HttpException {
  constructor() {
    super('Produtoo não encontrado', HttpStatus.NOT_FOUND);
  }
}
