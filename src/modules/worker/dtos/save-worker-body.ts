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
  })
  name: string;

  @ApiProperty({
    description: 'O email do usuário',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'O senha do usuário',
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'O cargo do usuário',
    type: String,
  })
  role: 'admin' | 'colaborator';

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
  })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'A imagem do usuário',
    type: String,
    format: 'binary',
  })
  image: Express.Multer.File;
}
