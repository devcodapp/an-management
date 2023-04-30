import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionBody {
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
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A decrição da opção',
    type: String,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Preço padrão de cada opção',
    type: Number,
    required: false,
  })
  price: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: Array,
    example: [
      {
        name: 'Ao ponto',
        price: undefined,
        imageUrl: '',
        imageId: '',
        desabledAt: undefined,
      },
    ],
  })
  suboptions?: Array<{
    name: string;
    price: number;
    imageUrl: string;
    imageId: string;
    desabledAt: Date;
  }>;
}
