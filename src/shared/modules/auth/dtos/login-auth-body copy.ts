import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAuthBody {
  @ApiProperty({
    description: 'O email do usuário',
    type: String,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    type: String,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'O id da restaurante',
    type: String,
    required: false,
  })
  // @IsUUID()
  restaurantId?: string;
}
