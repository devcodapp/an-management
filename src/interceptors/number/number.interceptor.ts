import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class NumberInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const numberFields = ['order', 'amountOfChairs'];
    
    numberFields.forEach((field) => {
      if (request.body[field])
        request.body[field] = Number(request.body[field]);
      if (request.query[field])
        request.query[field] = Number(request.query[field]);
    });
    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
