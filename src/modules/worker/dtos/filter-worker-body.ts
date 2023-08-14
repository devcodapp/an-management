import { ApiProperty } from '@nestjs/swagger';
import { FilterBaseBody } from '@shared/dtos/filter-base-body';

export class FilterWorkerBody extends FilterBaseBody {
  @ApiProperty({
    description: 'O email do usuário',
    type: String,
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'O nome do usuário',
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
