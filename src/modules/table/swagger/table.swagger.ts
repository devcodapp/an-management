import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um mesa',
  description: 'Cria um novo mesa e salva no banco de dados',
};
export const GetTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca um mesa',
  description: 'Busca um mesa no banco de dados pelo id',
};
export const FilterTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca mesas',
  description: 'Busca mesas no banco de dados',
};
export const UpdateTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza um mesa',
  description: 'Atualiza um mesa e salva no banco de dados',
};
export const DeleteTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui um mesa',
  description: 'Exclui um mesa',
};
export const DisableTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Desativa uma mesa',
  description: 'Desativa uma mesa',
};
export const EnableTableSwagger: Partial<ApiOperationOptions> = {
  summary: 'Ativa uma mesa',
  description: 'Ativa uma mesa',
};
