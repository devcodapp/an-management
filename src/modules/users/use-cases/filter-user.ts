import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';

interface FilterUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'colaborator';
  companyId?: string;
}

interface FilterUserResponse {
  users: User[] | null;
}

@Injectable()
export class FilterUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: FilterUserRequest): Promise<FilterUserResponse> {
    const users = await this.userRepository.users(request);

    return { users };
  }
}
