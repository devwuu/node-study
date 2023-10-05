import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import * as process from 'process';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  ); // 문서접근 권한 설정 swagger 보다 위에 설정해준다
  const swaggerConfig = new DocumentBuilder()
    .setTitle('고양이 커뮤니티')
    .setDescription('고양이 커뮤니티 api')
    .setVersion('1.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('docs', app, document); // swagger api의 endpoint 저장
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: ['localhost:3000'], // 허용할 url
    credentials: true, // 자격증명을 위한 헤더나 쿠키를 받음
  });
  // 파일의 실제 위치를 정하고 해당 경로에 어떻게 접근할건지 prefix를 정해준다
  // 즉, 원래 /common/uploads/cats/abc.png 로 접근하던 것을
  // /media/cats/dbc.png 로 접근하게 해줌
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });
  await app.listen(process.env.PORT);
}
bootstrap();
