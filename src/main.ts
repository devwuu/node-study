import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public')); // css 같은 정적 폴더 위치 셋팅
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // View 파일 위치 설정 (MVC 패턴 적용)
  app.setViewEngine('hbs'); // 템플릿 엔진 설정
  await app.listen(process.env.PORT);
}
bootstrap();
