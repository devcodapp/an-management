import { ApiProperty } from '@nestjs/swagger';
import { FilterBaseBody } from '@shared/dtos/filter-base-body';

export class FilterOptionBody extends FilterBaseBody {
  @ApiProperty({
    description: 'O nome da opção',
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'O preço da opção',
    type: Number,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    required: true,
  })
  restaurantId: string;
}
