import { HttpException, HttpStatus } from '@nestjs/common';

export class CouponAlreadExists extends HttpException {
  constructor() {
    super('Já existe um cupom com este código', HttpStatus.CONFLICT);
  }
}
