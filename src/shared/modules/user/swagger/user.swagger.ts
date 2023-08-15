import { ApiOperationOptions } from '@nestjs/swagger';

export const CreateUserSwagger: Partial<ApiOperationOptions> = {
  summary: 'Cria um usuário',
  description: 'Cria um nova usuário e salva no banco de dados',
};
// export const GetUserSwagger: Partial<ApiOperationOptions> = {
//   summary: 'Busca um restaurante',
//   description: 'Busca um restaurante no banco de dados pelo id',
// };
// export const FilterUserSwagger: Partial<ApiOperationOptions> = {
//   summary: 'Busca restaurantes',
//   description: 'Busca restaurantes no banco de dados',
// };
// export const UpdateUserSwagger: Partial<ApiOperationOptions> = {
//   summary: 'Atualiza um restaurante',
//   description: 'Atualiza um restaurante e salva no banco de dados',
// };
// export const OpenUserSwagger: Partial<ApiOperationOptions> = {
//   summary: 'Define um restaurante como aberta',
//   description: 'Desativa um restaurante',
// };
// export const CloseUserSwagger: Partial<ApiOperationOptions> = {
//   summary: 'Define um restaurante como fechada',
//   description: 'Define um restaurante como fechada',
// };
// export const DisableUserSwagger: Partial<ApiOperationOptions> = {
//   summary: 'Desativa um restaurante',
//   description: 'Desativa um restaurante',
// };
