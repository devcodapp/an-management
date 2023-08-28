import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class SaveOwnerBody {
  @IsNotEmpty()
  @IsUUID()
  ownerId: string;

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  password?: string
}