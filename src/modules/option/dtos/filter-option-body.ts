import { ApiProperty } from '@nestjs/swagger';

export class FilterOptionBody {
  @ApiProperty({
    description: 'O nome da opção',
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'O preço da opção',
    type: Number,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    required: true,
  })
  companyId: string;
}
