import { IsNumber, IsOptional } from "class-validator";

export class PaginationProps {
  @IsOptional()
  @IsNumber()
  currentPage: number = 1;

  @IsOptional()
  @IsNumber()
  perPage: number = 10;
}