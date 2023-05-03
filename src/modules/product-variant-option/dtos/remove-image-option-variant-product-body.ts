import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveImageOptionVariantProductBody {
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
}
