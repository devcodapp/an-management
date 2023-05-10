import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class BooleanInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const booleanFields = ['isOpened', 'disabledAt', 'category'];
    booleanFields.forEach((field) => {
      if (request.body[field] == 'true') {
        request.body[field] = true;
      }
      if (request.body[field] == 'false') {
        request.body[field] = false;
      }
      if (request.query[field] == 'true') {
        request.query[field] = true;
      }
      if (request.query[field] == 'false') {
        request.query[field] = false;
      }
    });
    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
