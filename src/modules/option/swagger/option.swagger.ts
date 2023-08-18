import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma opção',
  description: 'Cria uma novo oção e salva no banco de dados',
};
export const GetOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca uma opção',
  description: 'Busca uma opção no banco de dados pelo id',
};
export const FilterOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca opções',
  description: 'Busca opções no banco de dados',
};
export const UpdateOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma opção',
  description: 'Atualiza uma opção e salva no banco de dados',
};
export const DeleteOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui uma opção',
  description: 'Exclui uma opção',
};
export const DisableOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Desativa uma opção',
  description: 'Desativa uma opção',
};
export const EnableOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Ativa uma opção',
  description: 'Ativa uma opção',
};
