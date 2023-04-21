import { ApiProperty } from '@nestjs/swagger';

export class FilterCompanyBody {
  @ApiProperty({
    description: 'O nome da empresa',
    type: String,
    example: 'WebForge',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A descrição da Empresa',
    type: String,
    required: false,
    example: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
  })
  description: string;

  @ApiProperty({
    description: 'Tags da empresa',
    type: [String],
    required: false,
    example: ['Comida', 'Bebidas'],
  })
  tags: string[];

  @ApiProperty({
    description: 'Tipo da empresa',
    type: String,
    required: false,
    example: 'Restaurante',
  })
  type: string;

  @ApiProperty({
    description: 'Busca empresas que estão abertas no momento',
    type: Boolean,
    required: false,
    example: true,
  })
  isOpened: boolean;
}
