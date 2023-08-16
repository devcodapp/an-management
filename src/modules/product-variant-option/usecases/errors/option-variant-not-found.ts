import { HttpException, HttpStatus } from '@nestjs/common';

export class OptionVariantNotFound extends HttpException {
  constructor() {
    super('Variação de opção não encontrada', HttpStatus.NOT_FOUND);
  }
}
