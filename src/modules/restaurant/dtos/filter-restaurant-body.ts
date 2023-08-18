import { ApiProperty } from '@nestjs/swagger';

export class FilterRestaurantBody {
  @ApiProperty({
    description: 'O nome da restaurante',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A descrição da Restaurante',
    type: String,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Tags da restaurante',
    type: [String],
    required: false,
  })
  tags: string[];

  @ApiProperty({
    description: 'Tipo da restaurante',
    type: String,
    required: false,
  })
  type: string;

  @ApiProperty({
    description: 'Busca restaurantes que estão abertas no momento',
    type: Boolean,
    required: false,
    example: true,
  })
  isOpened: boolean;

  @ApiProperty({
    description: 'Busca restaurantes que foram desativadas',
    type: Boolean,
    required: false,
    example: true,
  })
  disabledAt: boolean;
}
