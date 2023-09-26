import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import * as process from "process";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(process.env.PORT);
}
bootstrap();
