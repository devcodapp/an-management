import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma restaurante',
  description: 'Cria uma nova restaurante e salva no banco de dados',
};
export const GetRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca uma restaurante',
  description: 'Busca uma restaurante no banco de dados pelo id',
};
export const FilterRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca restaurantes',
  description: 'Busca restaurantes no banco de dados',
};
export const UpdateRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma restaurante',
  description: 'Atualiza uma restaurante e salva no banco de dados',
};
export const OpenRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Define uma restaurante como aberta',
  description: 'Desativa uma restaurante',
};
export const CloseRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Define uma restaurante como fechada',
  description: 'Define uma restaurante como fechada',
};
export const DisableRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Desativa uma restaurante',
  description: 'Desativa uma restaurante',
};
