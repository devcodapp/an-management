import { Injectable } from '@nestjs/common';
import { UserNotFound } from './errors/user-not-found';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';

interface DeleteUserRequest {
  userId: string;
}
interface DeleteUserResponse {
  user: User;
}

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const { userId } = request;

    const user = await this.userRepository.user(userId);

    if (!user) {
      throw new UserNotFound();
    }

    user.deletedAt = new Date();
    user.deletedUser = '123';

    await this.userRepository.save(user);

    return { user };
  }
}
