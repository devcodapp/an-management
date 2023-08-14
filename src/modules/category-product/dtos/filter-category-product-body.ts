import { ApiProperty } from '@nestjs/swagger';
import { FilterBaseBody } from '@shared/dtos/filter-base-body';

export class FilterCategoryProductBody extends FilterBaseBody {
  @ApiProperty({
    description: 'O nome da categoria de produto',
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    required: false,
  })
  restaurantId?: string;
}
