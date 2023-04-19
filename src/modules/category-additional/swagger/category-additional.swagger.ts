import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateCategoryAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma categoria de adicional',
  description:
    'Cria uma nova categoria de adicionais e salva no banco de dados',
};
export const GetCategoryAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca uma categoria de adicional',
  description: 'Busca uma categoria de adicionais no banco de dados pelo id',
};
export const FilterCategoryAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca categorias de adicional',
  description: 'Busca categorias de adicionais no banco de dados',
};
export const UpdateCategoryAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma categoria de adicional',
  description: 'Atualiza uma categoria de adicionais e salva no banco de dados',
};
export const DeleteCategoryAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui uma categoria de adicional',
  description: 'Exclui uma categoria de adicionais',
};
