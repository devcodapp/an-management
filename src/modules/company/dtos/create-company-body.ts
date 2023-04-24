import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyBody {
  @ApiProperty({
    description: 'O nome da empresa',
    type: String,
    example: 'WebForge',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A descrição da Empresa',
    type: String,
    example: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Tags da empresa',
    type: [String],
    example: ['Comida', 'Bebidas'],
  })
  @IsNotEmpty()
  tags: string[];

  @ApiProperty({
    description: 'Tipo da empresa',
    type: String,
    example: 'Restaurante',
  })
  @IsNotEmpty()
  type: string;
}
