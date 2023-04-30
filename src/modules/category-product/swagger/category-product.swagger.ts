import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateCategoryProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma categoria de produto',
  description: 'Cria uma nova categoria de produtos e salva no banco de dados',
};
export const GetCategoryProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca uma categoria de produto',
  description: 'Busca uma categoria de produtos no banco de dados pelo id',
};
export const FilterCategoryProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca categorias de produto',
  description: 'Busca categorias de produtos no banco de dados',
};
export const UpdateCategoryProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma categoria de produto',
  description: 'Atualiza uma categoria de produtos e salva no banco de dados',
};
export const DeleteCategoryProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui uma categoria de produto',
  description: 'Exclui uma categoria de produtos',
};
export const EnableCategoryProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Ativa uma categoria de produto',
  description: 'Ativa uma categoria de produtos',
};
export const DisableCategoryProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Desativa uma categoria de produto',
  description: 'Desativa uma categoria de produtos',
};
