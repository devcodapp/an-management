import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateCategoryProductBody {
  @ApiProperty({
    description: 'O nome da categoria de produto',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A descrição da categoria de produto',
    type: String,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'A prioridade de amostra da categoria',
    type: Number,
  })
  @IsNotEmpty()
  order: number;

  @ApiProperty({
    description: 'O id da restaurante',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;

  @ApiProperty({
    description: 'A imagem da categoria',
    type: String,
    format: 'binary',
  })
  image: Express.Multer.File;
}
