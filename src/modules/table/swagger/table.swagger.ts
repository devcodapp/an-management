import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um table',
  description: 'Cria um novo table e salva no banco de dados',
};
export const GetTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca um table',
  description: 'Busca um table no banco de dados pelo id',
};
export const FilterTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca tables',
  description: 'Busca tables no banco de dados',
};
export const UpdateTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza um table',
  description: 'Atualiza um table e salva no banco de dados',
};
export const DeleteTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui um table',
  description: 'Exclui um table',
};
