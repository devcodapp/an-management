import { ApiProperty } from '@nestjs/swagger';

export class FilterRestaurantBody {
  @ApiProperty({
    description: 'O nome da empresa',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A descrição da Empresa',
    type: String,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Tags da empresa',
    type: [String],
    required: false,
  })
  tags: string[];

  @ApiProperty({
    description: 'Tipo da empresa',
    type: String,
    required: false,
  })
  type: string;

  @ApiProperty({
    description: 'Busca empresas que estão abertas no momento',
    type: Boolean,
    required: false,
    example: true,
  })
  isOpened: boolean;

  @ApiProperty({
    description: 'Busca empresas que foram desativadas',
    type: Boolean,
    required: false,
    example: true,
  })
  disabledAt: boolean;
}
