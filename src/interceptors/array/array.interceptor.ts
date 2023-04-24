import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ArrayInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const fieldsToConvert = ['tags'];
    fieldsToConvert.forEach((field) => {
      if (typeof request.body[field] === 'string') {
        request.body[field] = request.body[field].split(',');
      }
    });

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
