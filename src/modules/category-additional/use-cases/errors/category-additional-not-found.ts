import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryAdditionalNotFound extends HttpException {
  constructor() {
    super('Categoria de adicional não encontrada', HttpStatus.NOT_FOUND);
  }
}
