import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log(data.data);
        return {
          statusCode: context.switchToHttp().getResponse<Response>().statusCode,
          message: data.message,
          data: data.data,
        };
      }),
    );
  }
}
