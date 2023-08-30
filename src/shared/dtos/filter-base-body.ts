import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterBaseBody {
  @IsBoolean()
  @IsOptional()
  deleted?: boolean = false;

  @IsString()
  @IsNotEmpty()
  fields: string;
}
