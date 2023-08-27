import { User } from '../entities/user';

export class UserViewModel {
  static toHTTP({
    id,
    changePassword,
    email,
    name,
    restaurantId,
    username,
  }: User): IUserView {
    return {
      id,
      name,
      email,
      username,
      changePassword: changePassword || undefined,
      restaurantId: restaurantId || undefined,
    };
  }
}

export interface IUserView {
  id: string;
  name: string;
  username: string;
  email: string;
  restaurantId?: string;
  changePassword?: boolean;
}
