import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubOptionBody {
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
    description: 'Preço de cada opção',
    type: Number,
    required: false,
  })
  price: number;

  @ApiProperty({
    description: 'A imagem da opção',
    type: String,
    format: 'binary',
  })
  image: Express.Multer.File;
}
