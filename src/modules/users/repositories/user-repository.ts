import { User } from '../entities/user';
import { UserFilterInput } from '../interfaces/user-filter.input';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;

  abstract user(userId: string): Promise<User | null>;

  abstract users(filters: UserFilterInput): Promise<User[] | null>;

  abstract save(user: User): Promise<void>;
}
