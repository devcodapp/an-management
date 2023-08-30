import { HttpException, HttpStatus } from '@nestjs/common';

export class RoleNotFound extends HttpException {
  constructor() {
    super('Cargo não encontrado', HttpStatus.NOT_FOUND);
  }
}
