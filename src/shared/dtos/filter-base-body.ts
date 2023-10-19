import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterBaseBody {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value == 'true' ? true : value == 'false' ? false : value)
  deleted?: boolean = false;
}
