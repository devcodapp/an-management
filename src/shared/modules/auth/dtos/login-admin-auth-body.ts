import { IsNotEmpty } from 'class-validator';

export class LoginAdminAuthBody {

  @IsNotEmpty()
  email: string;


  @IsNotEmpty()
  password: string;
}
