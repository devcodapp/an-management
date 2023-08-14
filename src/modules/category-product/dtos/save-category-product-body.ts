import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class SaveCategoryProductBody {
  @ApiProperty({
    description: 'O id da categoria do produto',
    type: String,
    required: true,
  })
  @IsUUID()
  categoryProductId: string;

  @ApiProperty({
    description: 'O nome da categoria do produto',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A descrição da categoria do produto',
    type: String,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'A prioridade de amostra da categoria',
    type: Number,
    required: false,
  })
  order: number;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    required: false,
  })
  restaurantId?: string;

  @ApiProperty({
    description: 'A imagem da categoria do produto',
    type: String,
    format: 'binary',
    required: false,
  })
  image?: Express.Multer.File;
}
