import { ApiProperty } from '@nestjs/swagger';
import { FilterBaseBody } from '@shared/dtos/filter-base-body';

export class FilterCouponBody extends FilterBaseBody {
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

  @ApiProperty({
    description: 'Id da restaurante',
    type: String,
    required: true,
  })
  restaurantId: string;
}
