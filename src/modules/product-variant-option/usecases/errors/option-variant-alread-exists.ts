import { HttpException, HttpStatus } from '@nestjs/common';

export class OptionVariantAlreadExists extends HttpException {
  constructor() {
    super('Variação de opção já existe', HttpStatus.CONFLICT);
  }
}
