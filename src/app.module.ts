import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsGateway } from './chats/chats.gateway';
import { ChatsModule } from './chats/chats.module';
import * as process from 'process';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 다른 모듈에서도 동일하게 환경변수 사용할 수 있도록 셋팅
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    const isDebug = process.env.MODE === 'DEV';
    if (isDebug) mongoose.set('debug', isDebug);
  }
}
