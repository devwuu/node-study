import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module'; // 각 도메인 별로 모듈을 따로 만든다.
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import * as process from 'process';
import * as mongoose from 'mongoose';

// Nestjss는 모든 파일이 거의 모듈화가 되어 있다. 따라서 각 모듈을 등록해서 사용하게 돼있음
// 의존성 주입이 돼야 하는 것들이 등록되는 부분이 providers 이다

// import ?
// (1) 다양한 모듈을 app 모듈에서 합쳐서 하나의 애플리케이션으로 서비스 된다
// (2) exports 된 다른 모듈을 현재 모듈에서 사용할 수 있다 ( 이렇게 해야 남의 service 등을 주입받을 수 있다)

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // 자기 모듈이 아닌 곳에 있는 service는 Provider에 바로 때려박는 게 아님
  // 내 프로바이더에는 내 프로바이더만 작성한다. (단일 책임의 원칙)
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'DEV';
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    // * 같은 와일드 카드도 사용 가능, 특정 메서드에만 적용도 가능
    // 여기서는 cats/* 이하 모든 라우터에 미들웨어가 적용된다
    if (this.isDev) mongoose.set('debug', true); // 쿼리 로깅
  }
}
