import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { format: 'jpg', resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteImage(imageUrl: string) {
    const filename = imageUrl.split('.')[0];
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(filename, (error, result) => {
        if (error) return reject(error);
        resolve(result!);
      });
    });
  }
}
