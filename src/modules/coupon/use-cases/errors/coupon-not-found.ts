import { HttpException, HttpStatus } from '@nestjs/common';

export class CouponNotFound extends HttpException {
  constructor() {
    super('Cupom não encontrado', HttpStatus.NOT_FOUND);
  }
}
