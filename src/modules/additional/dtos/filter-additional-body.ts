import { ApiProperty } from '@nestjs/swagger';
import { FilterBaseBody } from '@shared/dtos/filter-base-body';
import { randomUUID } from 'crypto';

export class FilterAdditionalBody extends FilterBaseBody {
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
