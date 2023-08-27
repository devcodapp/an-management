import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateUserBody {
  @IsOptional()
  name?: string;

  @IsOptional()
  username?: string;

  @IsEmail({}, { message: 'O email precisa ser válido' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazio' })
  password: string;

  @IsOptional()
  @IsUUID()
  restaurantId?: string;
}
