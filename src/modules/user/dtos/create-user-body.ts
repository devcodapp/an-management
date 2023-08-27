import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserBody {
  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: 'O email do usuário',
    type: String,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    type: String,
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'Id do restaurante',
    type: String,
    nullable: true,
    required: false,
  })
  restaurantId?: string;

  @ApiProperty({
    description: 'Id do google do usuário',
    type: String,
    nullable: true,
    required: false,
  })
  googleId?: string;
}
