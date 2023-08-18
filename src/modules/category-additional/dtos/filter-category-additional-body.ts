import { ApiProperty } from '@nestjs/swagger';
import { FilterBaseBody } from '@shared/dtos/filter-base-body';

export class FilterCategoryAdditionalBody extends FilterBaseBody {
  @ApiProperty({
    description: 'O nome da categoria de adicional',
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'O id da restaurante',
    type: String,
    required: false,
  })
  restaurantId?: string;
}
