import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateOptionProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria uma opção de variação',
  description: 'Cria uma nova opção de variação e salva no banco de dados',
};
export const UpdateOptionProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Atualiza uma opção de variação',
  description: 'Atualiza uma opção de variação e salva no banco de dados',
};
export const DeleteOptionProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Exclui uma opção de variação',
  description: 'Exclui uma opção de variação',
};
export const EnableOptionProductVariantSwagger: Partial<ApiOperationOptions> = {
  summary: 'Habilita uma opção de variação',
  description: 'Habilita uma opção de variação',
};
export const DisableOptionProductVariantSwagger: Partial<ApiOperationOptions> =
  {
    summary: 'Desabilita uma opção de variação',
    description: 'Desabilita uma opção de variação',
  };
export const AddImageOptionProductVariantSwagger: Partial<ApiOperationOptions> =
  {
    summary: 'Adiciona uma imagem à opção de variação',
    description: 'Adiciona uma imagem à opção de variação',
  };
export const RemoveImageOptionProductVariantSwagger: Partial<ApiOperationOptions> =
  {
    summary: 'Exclui uma imagem de uma opção de variação',
    description: 'Exclui uma imagem de uma opção de variação',
  };
