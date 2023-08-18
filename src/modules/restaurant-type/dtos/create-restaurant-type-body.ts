import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantTypeBody {
  @ApiProperty({
    description: 'O nome do tipo',
    type: String,
    example: 'Pizzaria',
  })
  @IsNotEmpty()
  name: string;
}
