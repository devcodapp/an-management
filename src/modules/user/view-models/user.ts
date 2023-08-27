import { User } from '../entities/user';

export class UserViewModel {
  static toHTTP({
    id,
    changePassword,
    email,
    restaurantId,
    username,
  }: User): IUserView {
    return {
      id,
      email,
      username,
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
