import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateRestaurantTypeSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um tipo de restaurante',
  description: 'Cria um novo tipo de restaurante e salva no banco de dados',
};
export const FilterRestaurantTypeSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca tipos de restaurantes',
  description: 'Busca tipos de restaurantes no banco de dados',
};
export const DeleteRestaurantTypeSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui tipo de restaurantes',
  description: 'Exclui tipo de restaurantes no banco de dados',
};
