import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const error = exception.getResponse();
    // ==> string 인 경우는 개발자가 message로 넘겨준 API IS BROKEN
    // ==> object인 경우는 nest에서 발생시킨 에러

    // 나는 하나로 처리해주는 게 좋으니까 exception으로 할래
    // 분기처리해서 나눠서 처리해줄 수도 있음

    // send를 할건데 json으로 보낼거니까 json으로 한정지어준다
    response.status(exception.status)
    .json({
      status: exception.status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}

// 필터는 특정 함수에만 적용할 수도 있고 전역으로 적용할 수도 있다
