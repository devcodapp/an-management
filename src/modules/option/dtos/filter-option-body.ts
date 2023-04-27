import { ApiProperty } from '@nestjs/swagger';

export class FilterOptionBody {
  @ApiProperty({
    description: 'O nome da opção',
    type: String,
    example: 'Batata',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'O preço da opção',
    type: Number,
    example: 2.99,
    required: false,
  })
  price: number;
}
