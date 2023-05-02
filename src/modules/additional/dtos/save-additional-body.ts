import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class SaveAdditionalBody {
  @ApiProperty({
    description: 'O id do adicional',
    type: String,
    required: true,
  })
  @IsUUID()
  additionalId: string;

  @ApiProperty({
    description: 'O nome do adicional',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A preço do adicional',
    type: Number,
    required: false,
  })
  price: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: 'A imagem do adicional',
    type: String,
    format: 'binary',
    required: false,
  })
  image?: Express.Multer.File;
}