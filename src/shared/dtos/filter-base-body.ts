import { ApiProperty } from '@nestjs/swagger';

export class FilterBaseBody {
  @ApiProperty({
    description: 'Buscar excluidos',
    type: Boolean,
    required: false,
    default: false,
  })
  deleted: boolean;
}
