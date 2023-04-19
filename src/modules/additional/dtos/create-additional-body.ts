import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateAdditionalBody {
  @ApiProperty({
    description: 'O nome do adicional',
    type: String,
    example: 'Batata',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O preço do adicional',
    type: Number,
    example: 2.99,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
