import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  // 컨트롤러가 보낸 데이터를 가공해서 클라이언트에 응답해줄 수 있다
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log('before interceptor...');
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data, // controller에서 응답한 데이터
      })),
    );
  }
}
