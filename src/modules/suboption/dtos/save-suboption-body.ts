import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveSubOptionBody {
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
    description: 'O nome antigo da opção',
    type: String,
    required: true,
  })
  oldName: string;

  @ApiProperty({
    description: 'A preço da opção',
    type: Number,
    required: false,
  })
  price: number;

  @ApiProperty({
    description: 'A imagem da opção',
    type: String,
    required: false,
    format: 'binary',
  })
  image?: Express.Multer.File;
}
