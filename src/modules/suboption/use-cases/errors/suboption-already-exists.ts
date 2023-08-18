import { HttpException, HttpStatus } from '@nestjs/common';

export class SubOptionAlreadExists extends HttpException {
  constructor() {
    super('Sub-opção já existe', HttpStatus.CONFLICT);
  }
}
