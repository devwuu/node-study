import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index') // index = template 파일 이름
  root() {
    return {
      data: {
        today: Date.now(),
        message: 'Hello Nest MVC!',
      },
    };
  }
}
