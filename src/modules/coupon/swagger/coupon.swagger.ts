import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateCouponSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um cupom',
  description: 'Cria um novo cupom e salva no banco de dados',
};
export const GetCouponSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca um cupom',
  description: 'Busca um cupom no banco de dados pelo id',
};
export const FilterCouponSwagger: Partial<ApiOperationOptions> = {
  summary: 'Busca cupons',
  description: 'Busca cupons no banco de dados',
};
export const UpdateCouponSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza um cupom',
  description: 'Atualiza um cupom e salva no banco de dados',
};
export const DeleteCouponSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui um cupom',
  description: 'Exclui um cupom',
};
