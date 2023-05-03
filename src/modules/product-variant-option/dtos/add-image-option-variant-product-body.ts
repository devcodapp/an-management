import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddImageOptionVariantProductBody {
  @ApiProperty({
    description: 'O id do produto',
    type: String,
    required: true,
  })
  @IsUUID()
  productId: string;
  @ApiProperty({
    description: 'O id da variação',
    type: String,
    required: true,
  })
  @IsUUID()
  variantId: string;

  @ApiProperty({
    description: 'O sku da opção',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  optionSKU: string;

  @ApiProperty({
    description: 'A ordem da imagem da opção',
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  order: number;

  @ApiProperty({
    description: 'A Imagem da opção',
    required: true,
    format: 'binary',
  })
  @IsNotEmpty()
  image: Express.Multer.File;
}
