import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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

  @IsOptional()
  @Type(() => Image)
  image?: Express.Multer.File;

  @IsOptional()
  @IsUUID()
  roleId?: string;

  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;
}
