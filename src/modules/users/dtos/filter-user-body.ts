import { ApiProperty } from '@nestjs/swagger';

export class FilterUserBody {
  @ApiProperty({
    description: 'O email do usuário',
    type: String,
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    required: false,
  })
  companyId?: string;
}
