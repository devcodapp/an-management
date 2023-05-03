import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Additional } from '@modules/additional/entities/additional';

export class CreateProductBody {
  @ApiProperty({
    description: 'O nome do produto',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O preço do produto',
    type: Number,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'A descrição do produto',
    type: String,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
