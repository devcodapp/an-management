import { HttpException, HttpStatus } from '@nestjs/common';

export class SubOptionNotFound extends HttpException {
  constructor() {
    super('Sub-opção não encontrada', HttpStatus.NOT_FOUND);
  }
}
