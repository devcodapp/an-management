import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class SaveTableBody {
  @IsNotEmpty()
  @IsUUID()
  tableId: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  amountOfChairs?: number;

  @IsBoolean()
  @IsOptional()
  isOccupied?: boolean;

  @IsBoolean()
  @IsOptional()
  isReserved?: boolean;

  @IsOptional()
  @IsUUID()
  restaurantId?: string;
}
