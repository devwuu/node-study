import { Injectable } from '@nestjs/common';

@Injectable() // provider 에 붙는 데코레이터
export class AppService {
  getHello(): string {
    return 'Hello Nest js!';
  }
}
