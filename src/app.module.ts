import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module'; // 각 도메인 별로 모듈을 따로 만든다.
import { UsersModule } from './users/users.module';

// Nestjss는 모든 파일이 거의 모듈화가 되어 있다. 따라서 각 모듈을 등록해서 사용하게 돼있음
// 의존성 주입이 돼야 하는 것들이 등록되는 부분이 providers 이다

// import ?
// (1) 다양한 모듈을 app 모듈에서 합쳐서 하나의 애플리케이션으로 서비스 된다
// (2) exports 된 다른 모듈을 현재 모듈에서 사용할 수 있다 ( 이렇게 해야 service 등을 주입받을 수 있다)
@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
