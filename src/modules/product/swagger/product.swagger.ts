import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um produto',
  description: 'Cria um novo produto e salva no banco de dados',
};
export const GetProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca um produto',
  description: 'Busca um produto no banco de dados pelo id',
};
export const FilterProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca adicionais',
  description: 'Busca produtos no banco de dados',
};
export const UpdateProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza um produto',
  description: 'Atualiza um produto e salva no banco de dados',
};
export const DeleteProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui um produto',
  description: 'Exclui um produto',
};
export const DisableProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Desativa um produto',
  description: 'Desativa um produto',
};
export const EnableProductSwagger: Partial<ApiOperationOptions> = {
  summary: 'Ativa um produto',
  description: 'Ativa um produto',
};
