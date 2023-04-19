import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um adicional',
  description: 'Cria um novo adicional e salva no banco de dados',
};
export const GetAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca um adicional',
  description: 'Busca um adicional no banco de dados pelo id',
};
export const FilterAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca adicionais',
  description: 'Busca adicionais no banco de dados',
};
export const UpdateAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza um adicional',
  description: 'Atualiza um adicional e salva no banco de dados',
};
export const DeleteAdditionalSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui um adicional',
  description: 'Exclui um adicional',
};
