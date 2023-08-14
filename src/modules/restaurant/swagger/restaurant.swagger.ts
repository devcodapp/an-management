import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma empresa',
  description: 'Cria uma nova empresa e salva no banco de dados',
};
export const GetRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca uma empresa',
  description: 'Busca uma empresa no banco de dados pelo id',
};
export const FilterRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca empresas',
  description: 'Busca empresas no banco de dados',
};
export const UpdateRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma empresa',
  description: 'Atualiza uma empresa e salva no banco de dados',
};
export const OpenRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Define uma empresa como aberta',
  description: 'Desativa uma empresa',
};
export const CloseRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Define uma empresa como fechada',
  description: 'Define uma empresa como fechada',
};
export const DisableRestaurantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Desativa uma empresa',
  description: 'Desativa uma empresa',
};
