import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class FilterProductBody {
  @ApiProperty({
    description: 'O nome do adicional',
    type: String,
    example: 'Batata',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'O preço do adicional',
    type: Number,
    example: 2.99,
    required: false,
  })
  price: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
    example: randomUUID(),
    required: false,
  })
  categoryId: string;
}
