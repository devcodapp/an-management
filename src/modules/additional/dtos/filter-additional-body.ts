import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class FilterAdditionalBody {
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

  @ApiProperty({
    description: 'Retorno categoria',
    type: Boolean,
    required: false,
    default: false,
  })
  category: boolean;
}
