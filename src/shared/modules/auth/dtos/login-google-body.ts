import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginGoogleBody {
  @ApiProperty({
    description: 'O email do usuário',
    type: String,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'O id do google do usuário',
    type: String,
  })
  @IsNotEmpty()
  googleId: string;
}
