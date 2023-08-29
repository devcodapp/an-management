import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateWorkerBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;
}
