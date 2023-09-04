import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginAuthBody {

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsNotEmpty()
  password: string;
}
