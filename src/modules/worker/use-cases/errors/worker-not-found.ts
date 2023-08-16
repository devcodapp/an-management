import { HttpException, HttpStatus } from '@nestjs/common';

export class WorkerNotFound extends HttpException {
  constructor() {
    super('Funcionário não encontrado', HttpStatus.NOT_FOUND);
  }
}
