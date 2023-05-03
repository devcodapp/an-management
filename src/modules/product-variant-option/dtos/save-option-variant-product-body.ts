import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveOptionVariantProductBody {
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
    description: 'O titulo da opção',
    type: String,
    required: false,
  })
  title: string;

  @ApiProperty({
    description: 'O preço da opção',
    type: String,
    required: false,
  })
  price: string;
}
