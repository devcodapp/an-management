import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class SaveAdditionalBody {
  @ApiProperty({
    description: 'O id do adicional',
    type: String,
    example: randomUUID(),
    required: true,
  })
  @IsUUID()
  additionalId: string;

  @ApiProperty({
    description: 'O nome do adicional',
    type: String,
    example: 'Batata',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A preço do adicional',
    type: Number,
    example: 3.49,
    required: false,
  })
  price: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
    example: randomUUID(),
    required: false,
  })
  categoryId?: string;
}
