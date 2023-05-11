import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponBody {
  @ApiProperty({
    description: 'O titulo do cupom',
    type: String,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A descrição do cupom',
    type: String,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'O código do cupom',
    type: String,
  })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'O desconto de valor do cupom',
    type: Number,
  })
  discountValue: number;

  @ApiProperty({
    description: 'O desconto de porcentagem do cupom',
    type: Number,
  })
  discountPercentage: number;

  @ApiProperty({
    description: 'O limite de desconto do cupom',
    type: Number,
  })
  discountLimit: number;

  @ApiProperty({
    description: 'Expiração do cupom',
    type: Date,
  })
  @IsNotEmpty()
  expiresIn: Date;

  @ApiProperty({
    description: 'Id da empresa',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  companyId: string;
}
