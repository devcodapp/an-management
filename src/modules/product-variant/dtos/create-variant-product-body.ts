import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VariantTypes } from '../entities/product-variant';

export class CreateVariantProductBody {
  @ApiProperty({
    description: 'O id do produto',
    type: String,
    required: true,
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'O tipo da variação',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  type: VariantTypes;
}
