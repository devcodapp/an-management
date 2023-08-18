import { HttpException, HttpStatus } from '@nestjs/common';

export class AdditionalNotFound extends HttpException {
  constructor() {
    super('Adicional não encontrado', HttpStatus.NOT_FOUND);
  }
}
