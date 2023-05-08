import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBody {
  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O email do usuário',
    type: String,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'O senha do usuário',
    type: String,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'O cargo do usuário',
    type: String,
  })
  @IsNotEmpty()
  role: 'admin' | 'colaborator';

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'A imagem do usuário',
    type: String,
    format: 'binary',
  })
  image: Express.Multer.File;
}
