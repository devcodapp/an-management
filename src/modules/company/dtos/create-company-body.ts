import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyBody {
  @ApiProperty({
    description: 'O nome da empresa',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A descrição da Empresa',
    type: String,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Tags da empresa',
    type: [String],
  })
  @IsNotEmpty()
  tags: string[];

  @ApiProperty({
    description: 'Tipo da empresa',
    type: String,
  })
  @IsNotEmpty()
  type: string;
}
