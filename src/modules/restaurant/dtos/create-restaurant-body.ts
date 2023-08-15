import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantBody {
  @ApiProperty({
    description: 'O nome da restaurante',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A descrição da Restaurante',
    type: String,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Tags da restaurante',
    type: [String],
    nullable: true,
    required: false,
  })
  tags?: string[];

  @ApiProperty({
    description: 'Tipo da restaurante',
    type: String,
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Id do dono',
    type: String,
  })
  @IsNotEmpty()
  ownerId: string;
}
