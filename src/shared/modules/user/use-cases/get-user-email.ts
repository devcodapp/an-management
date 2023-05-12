import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';

interface GetUserEmailRequest {
  email: string;
  companyId: string;
}

interface GetUserEmailResponse {
  user: User;
}

export class GetUserEmail {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: GetUserEmailRequest): Promise<GetUserEmailResponse> {
    const { email, companyId } = request;

    const user = await this.userRepository.userByEmail(email, companyId);

    if (!user) {
      throw new UserNotFound();
    }

    return { user };
  }
}
