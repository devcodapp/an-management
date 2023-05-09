import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VariantTypes } from '../entities/product-variant';

export class SaveVariantProductBody {
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
    description: 'O tipo da variação',
    type: String,
    required: false,
  })
  type: VariantTypes;
}