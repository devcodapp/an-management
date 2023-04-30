import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdditionalBody {
  @ApiProperty({
    description: 'O nome do adicional',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O preço do adicional',
    type: Number,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: 'A imagem do adicional',
    type: String,
    format: 'binary',
  })
  image: Express.Multer.File;
}
