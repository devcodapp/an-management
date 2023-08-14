import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';

interface GetUserEmailRequest {
  email: string;
  restaurantId: string;
}

interface GetUserEmailResponse {
  user: User;
}

@Injectable()
export class GetUserEmail {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: GetUserEmailRequest): Promise<GetUserEmailResponse> {
    const { email, restaurantId } = request;
    const user = await this.userRepository.userByEmail(email, restaurantId);

    if (!user) {
      throw new UserNotFound();
    }

    return { user };
  }
}
