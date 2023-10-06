import { FilterBaseBody } from '@shared/dtos/filter-base-body';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterWorkerBody extends FilterBaseBody {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsUUID()
  restaurantId: string;
}
