import { User } from '../entities/user';

export class UserViewModel {
  static toHTTP({
    id,
    changePassword,
    email,
    username,
    restaurantId,
  }: User): IUserView {
    return {
      id,
      username,
      email,
      changePassword: changePassword || undefined,
      restaurantId: restaurantId || undefined,
    };
  }
}

export interface IUserView {
  id: string;
  username: string;
  email: string;
  restaurantId?: string;
  changePassword?: boolean;
}
