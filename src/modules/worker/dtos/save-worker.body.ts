import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SaveWorkerBody {
  @IsNotEmpty()
  @IsUUID()
  workerId: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsOptional()
  image?: Express.Multer.File;
}
