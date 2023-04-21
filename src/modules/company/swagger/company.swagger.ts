import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateCompanySwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma empresa',
  description: 'Cria uma nova empresa e salva no banco de dados',
};
export const GetCompanySwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca uma empresa',
  description: 'Busca uma empresa no banco de dados pelo id',
};
export const FilterCompanySwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca empresas',
  description: 'Busca empresas no banco de dados',
};
export const UpdateCompanySwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma empresa',
  description: 'Atualiza uma empresa e salva no banco de dados',
};
export const DisableCompanySwagger: Partial<ApiOperationOptions> = {
  summary: 'Desativa uma empresa',
  description: 'Desativa uma empresa',
};
