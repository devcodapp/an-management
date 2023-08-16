import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateSubOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma opção',
  description: 'Cria uma novo opção e salva no banco de dados',
};
export const FilterSubOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca opções',
  description: 'Busca opções no banco de dados',
};
export const UpdateSubOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma opção',
  description: 'Atualiza uma opção e salva no banco de dados',
};
export const DeleteSubOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui uma opção',
  description: 'Exclui uma opção',
};
export const DisableSubOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Desativa uma opção',
  description: 'Desativa uma opção',
};
export const EnableSubOptionSwagger: Partial<ApiOperationOptions> = {
  summary: 'Ativa uma opção',
  description: 'Ativa uma opção',
};
