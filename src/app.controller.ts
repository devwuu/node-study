import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// router 로 이용
@Controller() // 데코레이터. 데코레이터는 꼭 메서드 바로 위에 붙여주세요 떨어지면 아마 에러 날 것이다
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // === @Get("/") 아무것도 없는 경우, /(루트)와 동일하다. request(get) mapping 하는 데코레이터
  getHello(): string {
    return this.appService.getHello();
  }
}
