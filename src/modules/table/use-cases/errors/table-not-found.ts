import { HttpException, HttpStatus } from '@nestjs/common';

export class TableNotFound extends HttpException {
  constructor() {
    super('Mesa não encontrada', HttpStatus.NOT_FOUND);
  }
}
