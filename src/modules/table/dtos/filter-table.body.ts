import { FilterBaseBody } from '@shared/dtos/filter-base-body';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterTableBody extends FilterBaseBody {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  amountOfChairs?: number;
  
  @IsBoolean()
  @IsOptional()
  isOccupied?: boolean;

  @IsBoolean()
  @IsOptional()
  isReserved?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  disabled?: boolean;

  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;
}
