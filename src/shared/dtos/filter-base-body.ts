import { IsBoolean, IsOptional } from 'class-validator';

export class FilterBaseBody {
  @IsBoolean()
  @IsOptional()
  deleted?: boolean = false;
}
