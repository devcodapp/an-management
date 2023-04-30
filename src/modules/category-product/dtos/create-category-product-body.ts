import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateCategoryProductBody {
  @ApiProperty({
    description: 'O nome da categoria de produto',
    type: String,
    example: 'Bebidas',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A descrição da categoria de produto',
    type: String,
    example: 'Bebidas',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'A prioridade de amostra da categoria',
    type: Number,
    example: 3,
  })
  @IsNotEmpty()
  order: number;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'A imagem da categoria',
    type: String,
    format: 'binary',
  })
  image: Express.Multer.File;
}
