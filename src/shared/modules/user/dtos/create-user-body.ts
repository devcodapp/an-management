import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBody {
  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
  })
  @IsNotEmpty()
  username: string;

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
    description: 'Id do restaurante',
    type: String,
    nullable: true,
    required: false,
  })
  restaurantId?: string;
}
