import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Additional } from '@modules/additional/entities/additional';

export class CreateProductBody {
  @ApiProperty({
    description: 'O nome do produto',
    type: String,
    example: 'Batata',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O preço do produto',
    type: Number,
    example: 2.99,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'A descrição do produto',
    type: String,
    example: 'Skate',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Os adicionais do produto',
    type: Array<Additional>,
    example: '[]',
  })
  additionals: Array<Additional>;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  // @ApiProperty({
  //   description: 'A imagem do produto',
  //   type: String,
  //   format: 'binary',
  // })
  // image: Express.Multer.File;
}
