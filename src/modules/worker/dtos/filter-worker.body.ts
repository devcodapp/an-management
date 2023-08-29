import { FilterBaseBody } from '@shared/dtos/filter-base-body';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterWorkerBody extends FilterBaseBody {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsUUID()
  restaurantId: string;
}
