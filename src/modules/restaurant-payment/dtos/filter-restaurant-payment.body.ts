import { FilterBaseBody } from '@shared/dtos/filter-base-body';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterRestaurantPaymentBody extends FilterBaseBody {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;
}
