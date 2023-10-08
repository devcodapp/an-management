import { IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationProps {
  @IsOptional()
  @IsNumber()
  currentPage: number = 1;

  @IsOptional()
  @IsNumber()
  perPage: number = 10;

  @IsOptional()
  @IsString()
  orderKey: string = 'id';

  @IsOptional()
  @IsString()
  orderValue: string = 'asc';
}