import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { AppService } from './app.service';

// router 로 이용
@Controller() // 데코레이터. 데코레이터는 꼭 메서드 바로 위에 붙여주세요 떨어지면 아마 에러남. @Controller("path") 로 공통된 엔드포인트를 빼줄 수 있음
export class AppController {
  constructor(private readonly appService: AppService) {} // Nest에서 주로 사용하는 패턴. 생성자 의존성 주입. 필드로 선언하지 않았어도 필드로 접근할 수 있다

  @Get() // === @Get("/") 아무것도 없는 경우, /(루트)와 동일하다. request(get) mapping 하는 데코레이터
  getHello(): string {
    return this.appService.getHello();
  }
  // controller 와 관련된 데코레이터들
  @Get('print')
  getQueryParams(@Body() body: Body, @Query('id') query: string): string {
    return query;
  }
  @Get('print/:id')
  getPathParams(@Body() body: Body, @Param('id') path: string): string {
    return path;
  }
  @Post('print') // body의 경우엔 DTO 를 사용해서 validation을 할 수 있다
  getBody(@Body() body: Body): Body {
    return body;
  }
}
