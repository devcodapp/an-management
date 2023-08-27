import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';

interface GetUserRequest {
  userId: string;
}

interface GetUserResponse {
  user: User;
}

export class GetUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const { userId } = request;

    const user = await this.userRepository.user(userId);

    if (!user) {
      throw new UserNotFound();
    }

    return { user };
  }
}
