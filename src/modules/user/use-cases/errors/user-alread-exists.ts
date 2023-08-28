import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadExists extends HttpException {
  constructor() {
    super('Este usuário já existe', HttpStatus.CONFLICT);
  }
}
