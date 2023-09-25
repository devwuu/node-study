import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(`request from ${req.ip} ${req.method}`);
    // 응답이 끝난 이후에 이벤트를 등록하면 응답하기 직전의 값도 로깅할 수 있다.
    res.on('finish', () => {
      this.logger.log(`FROM ${req.ip} ${req.method} -> ${res.statusCode}`);
    });
    next();
  }
}
