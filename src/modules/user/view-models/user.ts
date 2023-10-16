import { User } from '../entities/user';

export class UserViewModel {
  static toHTTP({
    id,
    changePassword,
    email,
    username,
  }: User): IUserView {
    return {
      id,
      email,
      username,
      changePassword: changePassword || undefined,
    };
  }
}

export interface IUserView {
  id: string;
  username: string;
  email: string;
  changePassword?: boolean;
}
