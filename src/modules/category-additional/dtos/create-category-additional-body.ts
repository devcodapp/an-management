import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCategoryAdditionalBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  order: number;

  @IsNotEmpty()
  @IsUUID()
  companyId: string;
}
