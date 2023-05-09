import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateWorkerSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um usuário',
  description: 'Cria um nova usuários e salva no banco de dados',
};
export const GetWorkerSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca um usuário',
  description: 'Busca um usuários no banco de dados pelo id',
};
export const FilterWorkerSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca categorias de produto',
  description: 'Busca categorias de produtos no banco de dados',
};
export const UpdateWorkerSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza um usuário',
  description: 'Atualiza um usuários e salva no banco de dados',
};
export const DeleteWorkerSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui um usuário',
  description: 'Exclui um usuários',
};
