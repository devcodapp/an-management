import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTableBody {
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
  companyId: string;
}
