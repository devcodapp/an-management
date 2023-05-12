import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';
import { UserAlreadExists } from './errors/user-alread-exists';
import { encodePassword } from '@shared/services/encodePassword';

interface CreateUserRequest {
  email: string;
  password: string;
  username: string;
  companyId: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, password, username, companyId } = request;

    const userExists = await this.userRepository.userByEmail(email, companyId);

    if (userExists) {
      throw new UserAlreadExists();
    }

    const user = new User({
      email,
      password: encodePassword(password),
      username,
      companyId,
    });

    await this.userRepository.save(user);

    return { user };
  }
}
