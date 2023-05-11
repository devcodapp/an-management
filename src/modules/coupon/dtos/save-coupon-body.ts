import { ApiProperty } from '@nestjs/swagger';

export class SaveCouponBody {
  @ApiProperty({
    description: 'O titulo do cupom',
    type: String,
    required: false,
  })
  title: string;

  @ApiProperty({
    description: 'A descrição do cupom',
    type: String,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'O código do cupom',
    type: String,
    required: false,
  })
  code: string;

  @ApiProperty({
    description: 'O desconto de valor do cupom',
    type: Number,
    required: false,
  })
  discountValue: number;

  @ApiProperty({
    description: 'O desconto de porcentagem do cupom',
    type: Number,
    required: false,
  })
  discountPercentage: number;

  @ApiProperty({
    description: 'O limite de desconto do cupom',
    type: Number,
    required: false,
  })
  discountLimit: number;

  @ApiProperty({
    description: 'Expiração do cupom',
    type: Date,
    required: false,
  })
  expiresIn: Date;
}
