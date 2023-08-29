import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameAlreadExists extends HttpException {
  constructor() {
    super('Este nome de usuário já esta em uso', HttpStatus.CONFLICT);
  }
}
