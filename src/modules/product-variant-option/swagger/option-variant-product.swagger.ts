import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateOptionProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma opção de variação',
  description: 'Cria uma nova opção de variação e salva no banco de dados',
};
export const UpdateOptionProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma opção de variação',
  description: 'Atualiza uma opção de variação e salva no banco de dados',
};
export const DeleteOptionProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui uma opção de variação',
  description: 'Exclui uma opção de variação',
};
