import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductVariantNotFound extends HttpException {
  constructor() {
    super('Variação de produto não encontrada', HttpStatus.NOT_FOUND);
  }
}
