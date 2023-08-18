import { HttpException, HttpStatus } from '@nestjs/common';

export class OptionNotFound extends HttpException {
  constructor() {
    super('Opção não encontrada', HttpStatus.NOT_FOUND);
  }
}
