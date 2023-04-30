import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SubOption } from '../entities/suboption';

export class SaveOptionBody {
  @ApiProperty({
    description: 'O id da opção',
    type: String,
    required: true,
  })
  @IsUUID()
  optionId: string;

  @ApiProperty({
    description: 'O nome da opção',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A preço da opção',
    type: Number,
    required: false,
  })
  defaultPrice: number;

  @ApiProperty({
    description: 'As suboptions da opção',
    type: String,
    required: false,
  })
  suboptions?: Array<SubOption>;
}
