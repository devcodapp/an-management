import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class SaveCategoryProductBody {
  @ApiProperty({
    description: 'O id da categoria de adicional',
    type: String,
    required: true,
  })
  @IsUUID()
  categoryProductId: string;

  @ApiProperty({
    description: 'O nome da categoria de produto',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A descrição da categoria de produto',
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
  companyId?: string;

  @ApiProperty({
    description: 'A imagem da categoria de produto',
    type: String,
    format: 'binary',
    required: false,
  })
  image?: Express.Multer.File;
}