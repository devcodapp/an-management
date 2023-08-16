import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryProductNotFound extends HttpException {
  constructor() {
    super('Categora de produto não encontrada', HttpStatus.NOT_FOUND);
  }
}
