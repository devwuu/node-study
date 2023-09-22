import { Injectable } from '@nestjs/common';

@Injectable() // provider 에 붙는 데코레이터
export class CatsService {
  public sayMeow(): string {
    return 'Meow';
  }
}
