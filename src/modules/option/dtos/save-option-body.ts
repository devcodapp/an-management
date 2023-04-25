import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { SubOption } from '../entities/suboption';

export class SaveAdditionalBody {
  @ApiProperty({
    description: 'O id da opção',
    type: String,
    example: randomUUID(),
    required: true,
  })
  @IsUUID()
  optionId: string;

  @ApiProperty({
    description: 'O nome da opção',
    type: String,
    example: 'Batata',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A preço da opção',
    type: Number,
    example: 3.49,
    required: false,
  })
  defaultPrice: number;

  @ApiProperty({
    description: 'As suboptions da opção',
    type: String,
    example: [
      {
        name: 'Ao ponto',
        price: undefined,
        imageUrl: '',
        imageId: '',
        desabledAt: undefined,
      },
    ],
    required: false,
  })
  suboptions?: Array<SubOption>;
}
