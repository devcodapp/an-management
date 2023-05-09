import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma variação de produto',
  description: 'Cria uma nova variação de produto e salva no banco de dados',
};
export const UpdateProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma variação de produto',
  description: 'Atualiza uma variação de produto e salva no banco de dados',
};
export const DeleteProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui uma variação de produto',
  description: 'Exclui uma variação de produto',
};
