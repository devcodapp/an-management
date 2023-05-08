import { User } from '../entities/user';

export class UserViewModel {
  static toHTTP(User: User): IUserView {
    return {
      id: User.id,
      name: User.name,
      email: User.email,
      imageUrl: User.imageUrl,
      password: User.password,
      role: User.role,
      companyId: User.companyId,
    };
  }
}

export interface IUserView {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  password: string;
  role: 'admin' | 'colaborator';
  companyId: string;
}
