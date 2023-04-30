import { ApiProperty } from '@nestjs/swagger';

export class FilterCategoryProductBody {
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
  companyId?: string;
}
