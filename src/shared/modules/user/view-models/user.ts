import { User } from '../entities/user';

export class UserViewModel {
  static toHTTP({
    id,
    changePassword,
    email,
    name,
    restaurantId,
    username,
    googleId,
  }: User): IUserView {
    return {
      id,
      name,
      email,
      googleId,
      username,
      changePassword: changePassword || undefined,
      restaurantId: restaurantId || undefined,
    };
  }
}

export interface IUserView {
  id: string;
  name?: string;
  username?: string;
  googleId?: string;
  email: string;
  restaurantId?: string;
  changePassword?: boolean;
}
