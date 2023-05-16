import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerBody {
  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O cargo do usuário',
    type: String,
  })
  @IsNotEmpty()
  role: 'admin' | 'colaborator';

  @ApiProperty({
    description: 'A imagem do usuário',
    type: String,
    format: 'binary',
  })
  image: Express.Multer.File;

  @ApiProperty({
    description: 'O id do usuário',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
