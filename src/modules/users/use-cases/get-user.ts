import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';

interface GetUserRequest {
  id: string;
}

interface GetUserResponse {
  user: User | null;
}

@Injectable()
export class GetUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const { id } = request;

    const user = await this.userRepository.user(id);
    return { user };
  }
}
