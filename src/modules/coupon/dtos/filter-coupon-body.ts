import { ApiProperty } from '@nestjs/swagger';

export class FilterCouponBody {
  @ApiProperty({
    description: 'O título do cupom',
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
    description: 'Busca cupoms que expiraram',
    type: Boolean,
    required: false,
    example: true,
  })
  expired: boolean;
}
