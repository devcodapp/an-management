import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um restaurante',
  description: 'Cria um nova restaurante e salva no banco de dados',
};
export const GetRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca um restaurante',
  description: 'Busca um restaurante no banco de dados pelo id',
};
export const FilterRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca restaurantes',
  description: 'Busca restaurantes no banco de dados',
};
export const UpdateRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza um restaurante',
  description: 'Atualiza um restaurante e salva no banco de dados',
};
export const OpenRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Define um restaurante como aberta',
  description: 'Desativa um restaurante',
};
export const CloseRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Define um restaurante como fechada',
  description: 'Define um restaurante como fechada',
};
export const DisableRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Desativa um restaurante',
  description: 'Desativa um restaurante',
};
