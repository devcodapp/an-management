import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FilterBaseBody } from '@shared/dtos/filter-base-body';

export class FilterTableBody extends FilterBaseBody {
  @ApiProperty({
    description: 'O nome do table',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'O preço do table',
    type: Number,
    required: false,
  })
  amountOfChairs: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
    required: false,
  })
  @IsNotEmpty()
  restaurantId: string;
}
