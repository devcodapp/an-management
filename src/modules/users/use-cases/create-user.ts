import { Injectable } from '@nestjs/common';
import { Order } from '@shared/entities/order';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { UsersRepository } from '../repositories/user-repository';
import { User } from '../entities/user';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'colaborator';
  companyId: string;
  image: Express.Multer.File;
}
interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(
    private userRepository: UsersRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { companyId, name, email, password, role, image } = request;
    const uploadedImage = await this.cloudinary.uploadImage(image);
    const user = new User(
      {
        name,
        email,
        password,
        role,
        imageId: uploadedImage.public_id,
        imageUrl: uploadedImage.url,
        companyId,
      },
      { createdUser: '123' },
    );

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
