import { ApiProperty } from '@nestjs/swagger';
export class FilterProductBody {
  @ApiProperty({
    description: 'O nome do produto',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'O preço do produto',
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

  @ApiProperty({
    description: 'Retorno da categoria',
    type: Boolean,
    required: true,
    default: false,
  })
  categoryReturn: boolean;

  @ApiProperty({
    description: 'Retorno de adicionais',
    type: Boolean,
    required: true,
    default: false,
  })
  additionalsReturn: boolean;
}
