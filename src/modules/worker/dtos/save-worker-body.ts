import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveWorkerBody {
  @ApiProperty({
    description: 'O id do usuário',
    type: String,
    required: true,
  })
  @IsUUID()
  workerId: string;

  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'O email do usuário',
    type: String,
    required: false,
  })
  email: string;

  @ApiProperty({
    description: 'O senha do usuário',
    type: String,
    required: false,
  })
  password: string;

  @ApiProperty({
    description: 'O cargo do usuário',
    type: String,
    required: false,
  })
  role: 'admin' | 'colaborator';

  @ApiProperty({
    description: 'A imagem do usuário',
    type: String,
    format: 'binary',
    required: false,
  })
  image: Express.Multer.File;
}
