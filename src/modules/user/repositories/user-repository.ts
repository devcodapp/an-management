import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;

  abstract user(userId: string): Promise<User | null>;

  abstract userByEmail(
    email: string,
    restaurantId?: string,
  ): Promise<User | null>;

  abstract userByUsername(
    username: string,
  ): Promise<User | null>;

  abstract save(user: User): Promise<void>;
}
