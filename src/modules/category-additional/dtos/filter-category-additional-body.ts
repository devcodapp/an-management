import { ApiProperty } from '@nestjs/swagger';

export class FilterCategoryAdditionalBody {
  @ApiProperty({
    description: 'O nome da categoria de adicional',
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

  @ApiProperty({
    description: 'Buscar excluidos',
    type: Boolean,
    required: false,
    default: false,
  })
  deleted?: boolean;
}
