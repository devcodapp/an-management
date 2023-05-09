import { ApiProperty } from '@nestjs/swagger';
export class FilterProductBody {
  @ApiProperty({
    description: 'O nome do adicional',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'O preço do adicional',
    type: Number,
    required: false,
  })
  price: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
    required: false,
  })
  categoryId: string;
}
