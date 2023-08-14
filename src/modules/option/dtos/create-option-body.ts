import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionBody {
  @ApiProperty({
    description: 'O nome da opção',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A decrição da opção',
    type: String,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Preço padrão de cada opção',
    type: Number,
    required: false,
  })
  price: number;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    required: true,
  })
  restaurantId: string;
}
