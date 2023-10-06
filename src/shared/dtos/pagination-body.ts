import { IsNumber, IsOptional } from "class-validator";

export class PaginationProps {
  @IsNumber()
  @IsOptional()
  currentPage: number = 1;

  @IsNumber()
  @IsOptional()
  perPage: number = 10;
}