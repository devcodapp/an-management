import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class FilterRestaurantBody {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  type?: string;

  @IsBoolean()
  @IsOptional()
  isOpened?: boolean;

  @IsString({})
  @IsOptional()
  disabled?: string;
}
