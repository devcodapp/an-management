import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBody {
  @ApiProperty({
    description: 'O id do usuário',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
    required: false,
  })
  username: string;

  @ApiProperty({
    description: 'O email do usuário',
    type: String,
    required: false,
  })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    type: String,
    required: false,
  })
  password: string;
}
