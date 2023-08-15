import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';
import { UserAlreadExists } from './errors/user-alread-exists';
import { encodePassword } from '@shared/services/encodePassword';

interface CreateUserRequest {
  email: string;
  password: string;
  username: string;
  restaurantId?: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, password, username, restaurantId } = request;

    const userExists = await this.userRepository.userByEmail(
      email,
      restaurantId,
    );

    if (userExists) {
      throw new UserAlreadExists();
    }

    const user = new User({
      email,
      password: encodePassword(password),
      username,
      restaurantId,
    });

    await this.userRepository.create(user);

    return { user };
  }
}
