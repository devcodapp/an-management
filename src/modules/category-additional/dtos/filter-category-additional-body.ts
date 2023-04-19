import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class FilterCategoryAdditionalBody {
  @ApiProperty({
    description: 'O nome da categoria de adicional',
    type: String,
    example: 'Bebidas',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    example: randomUUID(),
    required: false,
  })
  companyId?: string;
}
