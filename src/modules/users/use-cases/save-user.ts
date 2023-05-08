import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { UserNotFound } from './errors/user-not-found';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';

interface SaveUserRequest {
  userId: string;
  name?: string;
  email: string;
  password: string;
  role: 'admin' | 'colaborator';
  image?: Express.Multer.File;
}
interface SaveUserResponse {
  user: User;
}

@Injectable()
export class SaveUser {
  constructor(
    private userRepository: UsersRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(request: SaveUserRequest): Promise<SaveUserResponse> {
    const { userId, name, email, password, role, image } = request;

    const user = await this.userRepository.user(userId);

    if (!user) {
      throw new UserNotFound();
    }

    if (image) {
      await this.cloudinary.deleteImage(user.imageId);

      const uploadedImage = await this.cloudinary.uploadImage(image);
      user.imageId = uploadedImage.public_id;
      user.imageUrl = uploadedImage.url;
    }

    name ? (user.name = name) : null;
    email ? (user.email = email) : null;
    password ? (user.password = password) : null;
    role ? (user.role = role) : null;

    await this.userRepository.save(user);

    return { user };
  }
}
