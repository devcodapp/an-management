import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateUserSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um usuário',
  description: 'Cria um nova usuários e salva no banco de dados',
};
export const GetUserSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca um usuário',
  description: 'Busca um usuários no banco de dados pelo id',
};
export const FilterUserSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca categorias de produto',
  description: 'Busca categorias de produtos no banco de dados',
};
export const UpdateUserSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza um usuário',
  description: 'Atualiza um usuários e salva no banco de dados',
};
export const DeleteUserSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui um usuário',
  description: 'Exclui um usuários',
};
