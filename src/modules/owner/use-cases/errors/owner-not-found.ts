import { HttpException, HttpStatus } from '@nestjs/common';

export class OwnerNotFound extends HttpException {
  constructor() {
    super('Usuário não encontrado', HttpStatus.NOT_FOUND);
  }
}
