import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdditionalBody {
  @ApiProperty({
    description: 'O nome da opção',
    type: String,
    example: 'Ponto da carne',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A decrição da opção',
    type: String,
    example: 'Escolha o ponto da carne de sua preferência.',
  })
  @IsNotEmpty()
  description: string;

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
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'A imagem do adicional',
    type: String,
    format: 'binary',
  })
  image: Express.Multer.File;
}
