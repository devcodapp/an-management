import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateCategoryAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma categoria de adicional',
  description:
    'Cria uma nova categoria de adicionais e salva no banco de dados',
};
